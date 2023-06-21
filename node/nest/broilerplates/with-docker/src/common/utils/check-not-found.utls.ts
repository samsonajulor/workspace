import { NotFoundException } from '@nestjs/common'

/**
 * Generic function which checks if provided entity is null and throws not found exception
 * @param entity: typeof <Entity>
 * @returns void
 */
export function throwNotFoundIfNull<Entity>(entity: Entity | Entity[]) {
  if (!entity || (Array.isArray(entity) && !entity.length)) {
    throw new NotFoundException('Item Not Found')
  }
}
