import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { NlpService } from '../core/services/nlp.service';
import {
  processNLP,
  processNLPFailure,
  processNLPSuccess,
} from './global.actions';

@Injectable()
export class GlobalEffects {
  constructor(private actions: Actions, private nlpService: NlpService) {}

  processNLP = createEffect(() => {
    return this.actions.pipe(
      ofType(processNLP),
      switchMap(({ request }) =>
        this.nlpService.processNLP(request).pipe(
          switchMap(() => of(processNLPSuccess())),
          catchError(() => of(processNLPFailure()))
        )
      )
    );
  });
}
