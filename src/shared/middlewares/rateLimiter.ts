import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

export default async function rateLimiter(req: Request, res: Response, next: NextFunction) {
  try {
    const redisClient = redis.createClient({
      legacyMode: true,
      password: process.env.REDIS_PASS || undefined,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    await redisClient.connect();

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 10,
      duration: 1,
    });

    await limiter.consume(req.ip);

    return next();
  } catch (e) {
    throw new AppError('Too many requests.', 429);
  }
}
