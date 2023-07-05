import { PrismaClient as PratiqueAulas } from '../../../node_modules/@internal/pratiqueaulas/client'

const globalForPrisma = global

const apiPratiqueAulas = globalForPrisma.apiPratiqueAulas || new PratiqueAulas()

export default apiPratiqueAulas
