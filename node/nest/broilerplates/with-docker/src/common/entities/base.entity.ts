import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

/**
 * Base Entity with common columns
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
