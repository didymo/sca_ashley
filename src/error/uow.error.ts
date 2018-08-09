/**
 * App-level error object
 *
 * @param message  [string]         Human-readable information
 * @param code     [string]         Machne-readable error code
 * @param previous [Error object]   Chained error object
 */

export class UOWError extends Error
{
  public constructor
  (
    public message:   string,
    public code:      string,
    public previous?: any
  )
  {
    super(message);
  }
}
