import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

interface IApiDocOptions {
  tag: string
  isPublic?: boolean
}

/**
 * Decorator for swagger docs controller
 * @param options: IApiDocOptions
 * @returns result of @nestjs/common applyDecorators function
 */
export const ApiDoc = ({ tag = '', isPublic = false }: IApiDocOptions) => {
  const decorators = [
    ApiTags(tag),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
  ]

  if (!isPublic)
    decorators.push(ApiBearerAuth(), ApiUnauthorizedResponse({ description: 'Unauthorized' }))

  return applyDecorators(...decorators)
}
