/**
 * App-level error handler
 *
 * @param  error [Error object, could be anything]
 */

import { ErrorHandler } from '@angular/core';
import { UOWError }     from './uow.error';
import { Config }       from '../config';

export class UOWErrorHandler implements ErrorHandler
{
  // error could be anything
  handleError(error: any)
  {
    if (Config.debug === true)
    {
      console.error(error);
    }
  }
}
