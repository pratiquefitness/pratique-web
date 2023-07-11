import { PrismaClient as PratiqueUser } from '../../../node_modules/@internal/pratiqueuser/client'

const globalForPrisma = global

const apiPratiqueUser = globalForPrisma.apiPratiqueUser || new PratiqueUser()

export default apiPratiqueUser
