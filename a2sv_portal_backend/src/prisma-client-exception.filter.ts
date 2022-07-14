//src/prisma-client-exception.filter.ts
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.log('Error Code: ', exception.code);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        const status = HttpStatus.CONFLICT;
        const message = 'Unique constraint failed on the {constraint}';
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      case 'P2015':
        // A related record could not be found. {details}
        const s2015 = HttpStatus.NOT_FOUND;
        const m2015 = 'A related record could not be found.';
        response.status(s2015).json({
          statusCode: s2015,
          message: m2015,
        });
        break;
      case 'P2001':
        // The value {field_value} stored in the database for the field {field_name} is invalid for the field's type
        const s2005 = HttpStatus.NOT_FOUND;
        const m2005 =
          'The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist';
        response.status(s2005).json({
          statusCode: s2005,
          message: m2005,
        });
        break;
<<<<<<< HEAD
      case 'P2021':
        // The table {table} does not exist in the current database.
        const s2021 = HttpStatus.NOT_FOUND;
        const m2021 = exception.message.replace(/\n/g, '');
        response.status(s2021).json({
          statusCode: s2021,
          message: m2021,
=======
      case 'P2025':
        // The value {field_value} stored in the database for the field {field_name} is invalid for the field's type
        const s2025 = HttpStatus.NOT_FOUND;
        const m2025 =
          "The field_value stored in the database for the field_name is invalid for the field's type";
        response.status(s2025).json({
          statusCode: s2025,
          message: m2025,
>>>>>>> main
        });
        break;
      case 'P2003':
        // "Foreign key constraint failed on the field: {field_name}"
        const s2003 = HttpStatus.NOT_FOUND;
        const m2003 = 'Invalid foriegn key used';
        response.status(s2003).json({
          statusCode: s2003,
          message: m2003,
        });
      case 'P1017':
        const s1017 = HttpStatus.NOT_FOUND;
        const m1017 = 'Server has closed connection';
        response.status(s1017).json({
          statusCode: s1017,
          message: m1017,
        });
      // TODO catch other error codes (e.g. 'P2000' or 'P2025')
      default:
        // default 500 error code
        console.log('Error Code: ', exception.code);
        response.status(500).json({
          statusCode: 500,
          message: exception.code,
        });
        super.catch(exception, host);
        break;
    }
  }
}
