import { NextFunction, Request, Response } from 'express'
import * as HttpStatus from 'http-status-codes'
import { Holidays } from '@jbouduin/holidays';

export class HolidayService {
  public async getLanguages(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const holidays = new Holidays('../../holidays-lib/lib/assets');
      holidays.getSupportedLanguages().then(
        languages => res.json(languages),
        err => next(err));
    } catch (err) {
      // something could fail unexpectedly...
      // at some point the middleware chain should handle errors
      next(err)
    }
  }

  public async getHierarchyTree(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

      const holidays = new Holidays('../../holidays-lib/lib/assets', req.params.language);
      holidays.getHierarchyTree().then(
        languages => res.json(languages),
        err => next(err));
    } catch (err) {
      // something could fail unexpectedly...
      // at some point the middleware chain should handle errors
      next(err)
    }
  }

  public async getHolidays(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

      const holidays = new Holidays('../../holidays-lib/lib/assets', req.params.language);
      holidays.getHolidays(req.params.hierarchy.replace('.', '/',), Number(req.params.year), false)
        .then(
          languages => res.json(languages),
          err => next(err));
    } catch (err) {
      // something could fail unexpectedly...
      // at some point the middleware chain should handle errors
      next(err)
    }
  }
}
