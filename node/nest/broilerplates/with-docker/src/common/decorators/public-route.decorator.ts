import { SetMetadata } from '@nestjs/common'
/**
 * Constant for public route
 */
export const IS_PUBLIC_ROUTE = 'IS_PUBLIC_ROUTE'
/**
 * Decorator to set public route metadata
 * @returns CustomDecorator<string>
 */
export const PublicRoute = () => SetMetadata(IS_PUBLIC_ROUTE, true)
