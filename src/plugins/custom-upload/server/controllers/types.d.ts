import koa from 'koa';

export interface IRequest extends koa.Request {
  params: Record<string, string>;
}
