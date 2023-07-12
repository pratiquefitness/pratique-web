import { PrismaClient as PratiqueAulas } from '@internal/pratiqueaulas/client'

const globalForPrisma = global

const apiPratiqueAulas = globalForPrisma.apiPratiqueAulas || new PratiqueAulas()

export default apiPratiqueAulas
