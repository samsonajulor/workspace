import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PasswordService } from 'src/common/services/password.service'
import { throwNotFoundIfNull } from 'src/common/utils/check-not-found.utls'
import { Repository } from 'typeorm'
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { User } from './entity/user.entity'

/**
 * Basic User Service
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  /**
   * Find All Users
   * @returns Promise<User[]>
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({})
  }

  /**
   * Find user by id
   * @param id: string
   * @returns: Promise<User>
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException('User with provided id not found')
    }
    return user
  }

  /**
   * Find user by email
   * @param email: string
   * @returns Promise<User>
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email })
    throwNotFoundIfNull<typeof user>(user)
    return user
  }

  /**
   * Create new user. Used by Auth Service when signup new user
   * @param createUserDto: CreateUserDto
   * @returns: Promise<User>
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ email: createUserDto.email })
    if (existingUser) {
      throw new ConflictException('User with provided email already exists')
    }
    const user = this.userRepository.create({
      ...createUserDto,
      password: await this.passwordService.hashPassword(createUserDto.password),
    })
    return await this.userRepository.save(user)
  }

  /**
   * Update authorized user
   * @param updateUserDto: UpdateUserDto
   * @param userId: string
   * @returns: Promise<User>
   */
  async update(updateUserDto: UpdateUserDto, userId: string): Promise<User> {
    const user = await this.userRepository.preload({
      id: userId,
      ...updateUserDto,
    })
    throwNotFoundIfNull<typeof user>(user)
    return await this.userRepository.save(user)
  }

  /**
   * Delete authorized user
   * @param userId: string
   * @returns: Promise<void>
   */
  async delete(userId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId)
    throwNotFoundIfNull<typeof user>(user)
    await this.userRepository.delete(userId)
  }

  /**
   * Change user password
   * @param userId string
   * @param changePasswordDto ChangePasswordDto
   * @returns Promise<void>
   */
  async changeUserPassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const dbUser = await this.userRepository.findOne(userId)
    throwNotFoundIfNull<typeof dbUser>(dbUser)
    const isPassEqual = await this.passwordService.comparePassword(
      dbUser.password,
      changePasswordDto.password,
    )
    if (isPassEqual) {
      throw new ConflictException('New password must differ from existing one')
    }
    dbUser.password = await this.passwordService.hashPassword(changePasswordDto.password)
    await this.userRepository.save(dbUser)
  }
}
