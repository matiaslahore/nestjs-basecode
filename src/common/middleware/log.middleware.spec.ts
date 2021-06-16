import { LogMiddleware } from './log.middleware';

describe('LoggingMiddleware', () => {
  it('should be defined', () => {
    expect(new LogMiddleware()).toBeDefined();
  });
});
