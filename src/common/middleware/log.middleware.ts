import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!process.env.LOG_MIDDLEWARE)
      return next();

    console.time('Request-response time');
    const { body, params, headers } = req;

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const objToLog = {
        'authorization': headers.authorization,
        'params': params[0],
        'body': body,
        'statusCode': statusCode,
        'statusMessage': statusMessage
      };

      console.timeEnd('Request-response time');
      console.log(objToLog);
    });

    next();
  }
}