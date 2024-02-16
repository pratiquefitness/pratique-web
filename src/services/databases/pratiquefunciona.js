import { PrismaClient as PratiqueFunciona } from '@internal/pratiquefunciona/client'

const globalForPrisma = global

const apiPratiqueFunciona = globalForPrisma.apiPratiqueFunciona || new PratiqueFunciona()

export default apiPratiqueFunciona
