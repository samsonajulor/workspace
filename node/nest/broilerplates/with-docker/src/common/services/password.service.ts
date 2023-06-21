import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

/**
 * Password Service
 */
@Injectable()
export class PasswordService {
  private readonly SALT_ROUNDS = 10

  /**
   * Hash password method
   * @param plainPass: string
   * @returns: Promise<string>
   */
  async hashPassword(plainPass: string): Promise<string> {
    return await bcrypt.hash(plainPass, this.SALT_ROUNDS)
  }

  /**
   * Compare passwords method
   * @param hash: string
   * @param plainPass: string
   * @returns: Promise<boolean>
   */
  async comparePassword(hash, plainPass): Promise<boolean> {
    return await bcrypt.compare(plainPass, hash)
  }
}
