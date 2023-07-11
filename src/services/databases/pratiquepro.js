import { PrismaClient as PratiquePro } from '../../../node_modules/@internal/pratiquepro/client'

const globalForPrisma = global

const apiPratiquePro = globalForPrisma.apiPratiquePro || new PratiquePro()

export default apiPratiquePro
