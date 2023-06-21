import { applyDecorators } from '@nestjs/common'
import {
  ApiAcceptedResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'

interface IRoteDocOptions {
  operation?: string
  conflict?: boolean
  notFound?: boolean
  ok?: { type?: typeof Function | any; isArray?: boolean }
  created?: { type?: typeof Function | any; isArray?: boolean }
  accepted?: { type?: typeof Function | any; isArray?: boolean }
}

/**
 * Common route docs swagger decorator
 * @param options IRouteDocOptions
 * @returns result of @nestjs/common applyDecorators function
 */
export const RouteDoc = ({
  operation,
  conflict,
  notFound,
  ok,
  created,
  accepted,
}: IRoteDocOptions) => {
  const decorators = []
  if (operation) decorators.push(ApiOperation({ description: operation }))
  if (conflict) decorators.push(ApiConflictResponse({ description: 'Already exists' }))
  if (notFound) decorators.push(ApiNotFoundResponse({ description: 'Not found' }))
  if (ok) {
    decorators.push(ApiOkResponse({ description: 'Ok', type: ok.type, isArray: ok.isArray }))
  }
  if (created) {
    decorators.push(
      ApiCreatedResponse({ description: 'Created', type: created.type, isArray: created.isArray }),
    )
  }
  if (accepted) {
    decorators.push(
      ApiAcceptedResponse({
        description: 'Accepted',
        type: accepted.type,
        isArray: accepted.isArray,
      }),
    )
  }

  return applyDecorators(...decorators)
}
