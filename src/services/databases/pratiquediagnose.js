import { PrismaClient as PratiqueDiagnose } from '@internal/pratiquediagnose/client'

const globalForPrisma = global

const apiPratiqueDiagnose = globalForPrisma.apiPratiqueDiagnose || new PratiqueDiagnose()

export default apiPratiqueDiagnose
