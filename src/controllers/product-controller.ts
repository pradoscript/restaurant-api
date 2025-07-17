import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { knexInstance } from '@/database/knex';
import { AppError } from '@/utils/AppError';
class ProductController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.query;
            const products = await knexInstance<ProductRepository>('products')
                .select('*')
                .whereLike('name', `%${name ?? ""}%`)
            return response.json(products);
        } catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string().min(1, 'Name is required'),
                price: z.number().positive('Price must be a positive number')
            });

            const { name, price } = bodySchema.parse(request.body);

            await knexInstance<ProductRepository>('products').insert({ name, price })

            return response.status(201).json({ name, price });
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: 'ID must be a number' })
                .parse(request.params.id)

            const product = await knexInstance<ProductRepository>('products').select('*').where({ id }).first();
            if (!product) {
                throw new AppError('Product not found', 404);
            }

            const bodySchema = z.object({
                name: z.string().min(1, 'Name is required'),
                price: z.number().positive('Price must be a positive number')
            });
            const { name, price } = bodySchema.parse(request.body);
            await knexInstance<ProductRepository>('products').update({ name, price, updated_at: knexInstance.fn.now() }).where({ id });
            return response.json()
        } catch (error) {
            next(error);

        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: 'ID must be a number' })
                .parse(request.params.id)

            const product = await knexInstance<ProductRepository>('products').select('*').where({ id }).first();
            if (!product) {
                throw new AppError('Product not found', 404);
            }

            await knexInstance<ProductRepository>("products").delete().where({ id });
            return response.json();
        } catch (error) {
            next(error);

        }

    }
}

export { ProductController }