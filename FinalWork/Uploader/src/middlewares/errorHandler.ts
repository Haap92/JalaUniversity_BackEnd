import { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export function errorHandler(
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error.message, error.status);
  const status = error.status || 500;
  const message = error.message;
  response.setHeader("Content-type", "application/json");
  response.status(status).json({
    status,
    message,
  });
}
