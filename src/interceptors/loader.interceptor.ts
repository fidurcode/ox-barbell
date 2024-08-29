import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../layouts/services/loader.service';

export function loaderInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loaderService = inject(LoaderService);

  let totalRequests = 0;
  totalRequests++;

  loaderService.setLoading(true);

  return next(request).pipe(
    finalize((): void => {
      totalRequests--;
      if (totalRequests === 0) {
        loaderService.setLoading(false);
      }
    })
  );
}
