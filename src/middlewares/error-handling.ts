import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";


export function errorHandling(err: Error, request: any, response: any, next: any) {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    if (err instanceof ZodError) {
        return response.status(400).json({
            message: "Validation error",
            issues: err.format()
        });
    }
    return response.status(500).json({
        message: 'Internal server error'
    });
}   