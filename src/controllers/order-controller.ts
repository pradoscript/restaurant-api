import { knexInstance } from '@/database/knex'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'


class OrderController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantity: z.number()
            })

            const { table_session_id, product_id, quantity } = bodySchema.parse(request.body)

            const session = await knexInstance<TableSessionsRepository>("table_sessions").select().where({ id: table_session_id }).first()
            const product = await knexInstance<ProductRepository>("products").select().where({ id: product_id }).first()

            if (!session) {
                throw new AppError('Session Table not found')
            }


            if (session.closed_at) {
                throw new AppError('The table session is closed')
            }

            if (!product) {
                throw new AppError('The product was not found')
            }

            await knexInstance<OrderRepository>("orders").insert({
                table_session_id,
                product_id,
                quantity,
                price: product.price
            })
            return response.json()
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: 'ID must be a number' })
                .parse(request.params.id)

            const session = await knexInstance<TableSessionsRepository>("table_sessions").select().where({ id }).first()

            if (!session) {
                throw new AppError('The session does not exist')
            }

            const order = await knexInstance<OrderRepository>("orders")
                .select("orders.id", "orders.table_session_id", "orders.product_id", "products.name", "orders.price", "orders.quantity")
                .join("products", "products.id", "orders.product_id")
                .where({ table_session_id: id })

            if (!order) {
                throw new AppError('The order does not exist')
            }

            return response.json(order)

        } catch (error) {
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction) {
        const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), { message: 'ID must be a number' })
            .parse(request.params.id)



        const session = await knexInstance<TableSessionsRepository>("table_sessions").select().where({ id }).first()

        if (!session) {
            throw new AppError('The session does not exist')
        }

        const order = await knexInstance("orders")
            .select(
                knexInstance.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS total"),
                knexInstance.raw("COALESCE(SUM(orders.quantity), 0) AS quantity"))
            .where({ table_session_id: id }).first()

        if (!order) {
            throw new AppError('The order does not exist')
        }

        return response.json(order)

    }

}

export { OrderController }