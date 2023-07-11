import { PrismaClient as PratiqueFunciona } from '../../../node_modules/@internal/pratiquefunciona/client'

const globalForPrisma = global

const apiPratiqueFunciona = globalForPrisma.apiPratiqueFunciona || new PratiqueFunciona()

export default apiPratiqueFunciona
