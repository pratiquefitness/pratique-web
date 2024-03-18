import { PrismaClient as NovoPower } from '@internal/novopower/client'

const globalForPrisma = global

const apiNovoPower = globalForPrisma.apiNovoPower || new NovoPower()

export default apiNovoPower
