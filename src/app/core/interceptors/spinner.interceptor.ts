import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, finalize } from 'rxjs';
import { hideSpinner, showSpinner } from '../../state/global.actions';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.store.dispatch(showSpinner());
    return next
      .handle(request)
      .pipe(finalize(() => this.store.dispatch(hideSpinner())));
  }
}
