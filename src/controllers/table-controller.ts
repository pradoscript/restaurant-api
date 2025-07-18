import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { knexInstance } from '@/database/knex';
import { AppError } from '@/utils/AppError';


class TableController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const tables = await knexInstance<TableRespository>("tables").select()
            return response.json(tables)
        } catch (error) {
            next(error)
        }
    }
}


export { TableController }