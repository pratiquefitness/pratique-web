import { PrismaClient as PratiqueAulas } from '../../node_modules/@internal/pratiqueaulas/client'

const globalForPrisma = global

const prisma = globalForPrisma.prisma || new PratiqueAulas()

export default prisma
