import { TableController } from '@/controllers/table-controller'
import { Router } from 'express'

const TableRoutes = Router()
const tableController = new TableController()

TableRoutes.get('/', tableController.index)

export { TableRoutes }