import { Request, Response } from 'express';

export default (_req: Request, res: Response) => {
  res.render('errors/404', {
    title: '404',
  });
};
