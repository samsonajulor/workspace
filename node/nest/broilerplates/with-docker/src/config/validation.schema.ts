import { object, string, number } from '@hapi/joi'
/**
 * Envs validation schema
 * @returns object typeof @hapi/joi object
 */
export const createValidationSchema = () =>
  object({
    NODE_ENV: string().required(),
    PORT: number().required(),
    JWT_SECRET: string().required(),
    JWT_EXPIRES: string().required(),
    POSTGRES_USER: string().required(),
    POSTGRES_PASSWORD: string().required(),
    POSTGRES_DB: string().required(),
    POSTGRES_HOST: string().required(),
    POSTGRES_PORT: number().required(),
  })
