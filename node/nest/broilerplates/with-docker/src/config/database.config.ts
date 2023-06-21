import { registerAs } from '@nestjs/config'

export const databaseConfig = registerAs('database', () => ({
  port: parseInt(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  name: process.env.POSTGRES_DB,
}))
