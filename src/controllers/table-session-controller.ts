import { knexInstance } from '@/database/knex'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
class TableSessionController {

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_id: z.number()
            })
            const { table_id } = bodySchema.parse(request.body)

            const session = await knexInstance<TableSessionsRepository>("table_sessions")
                .where({ table_id })
                .orderBy("opened_at", "desc")
                .first()

            if (session && !session.closed_at) {
                throw new AppError('Session already opened!')
            }

            await knexInstance<TableSessionsRepository>("table_sessions").insert({ table_id, opened_at: knexInstance.fn.now() })
            return response.json()
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const sessions = await knexInstance<TableSessionsRepository>("table_sessions")
                .select()
                .orderBy("closed_at")
            return response.json(sessions)
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine(value => !isNaN(value), { message: 'id must be a number' })
                .parse(request.params.id)

            const sessionToBeClosed = await knexInstance<TableSessionsRepository>("table_sessions").select().where({ id }).first()

            if (!sessionToBeClosed || sessionToBeClosed.closed_at) {
                throw new AppError('Session already closed or does not exist')
            }

            await knexInstance<TableSessionsRepository>("table_sessions").update({ closed_at: knexInstance.fn.now() }).where({ id })


            return response.json(sessionToBeClosed)
        } catch (error) {
            next(error)
        }
    }
}

export { TableSessionController }