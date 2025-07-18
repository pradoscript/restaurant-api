import { TableSessionController } from '@/controllers/table-session-controller'
import { Router } from 'express'

const TableSessionRoutes = Router()

const tableSessionController = new TableSessionController()

TableSessionRoutes.get('/', tableSessionController.index)
TableSessionRoutes.post('/', tableSessionController.create)
TableSessionRoutes.patch('/:id', tableSessionController.update)

export { TableSessionRoutes }
