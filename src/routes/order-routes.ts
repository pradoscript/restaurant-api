import { OrderController } from '@/controllers/order-controller'
import { Router } from 'express'

const orderRoutes = Router()
const orderController = new OrderController()

orderRoutes.post('/', orderController.create)
orderRoutes.get('/table-session/:id', orderController.index)
orderRoutes.get('/table-session/:id/total', orderController.show)

export { orderRoutes }