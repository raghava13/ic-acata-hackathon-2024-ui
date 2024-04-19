import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { NlpService } from '../core/services/nlp.service';
import {
  getNlpAccuracy,
  getNlpAccuracyFailure,
  getNlpAccuracyLatest,
  getNlpAccuracyLatestFailure,
  getNlpAccuracyLatestSuccess,
  getNlpAccuracySuccess,
  getNlpResult,
  getNlpResultFailure,
  getNlpResultSuccess,
  processNlp,
  processNlpFailure,
  processNlpSuccess,
} from './global.actions';

@Injectable()
export class GlobalEffects {
  constructor(private actions: Actions, private nlpService: NlpService) {}

  processNLP = createEffect(() => {
    return this.actions.pipe(
      ofType(processNlp),
      switchMap(({ request }) =>
        this.nlpService.processNlp(request).pipe(
          switchMap((nlpId) => of(processNlpSuccess({ nlpId }))),
          catchError(() => of(processNlpFailure()))
        )
      )
    );
  });

  getNlpResult = createEffect(() => {
    return this.actions.pipe(
      ofType(getNlpResult),
      switchMap(({ nlpId }) =>
        this.nlpService.getNlpResult(nlpId).pipe(
          switchMap((nlpResult) => of(getNlpResultSuccess({ nlpResult }))),
          catchError(() => of(getNlpResultFailure()))
        )
      )
    );
  });

  getNlpAccuracy = createEffect(() => {
    return this.actions.pipe(
      ofType(getNlpAccuracy),
      switchMap(({ nlpId }) =>
        this.nlpService.getNlpAccuracy(nlpId).pipe(
          switchMap((nlpAccuracy) =>
            of(getNlpAccuracySuccess({ nlpAccuracy }))
          ),
          catchError(() => of(getNlpAccuracyFailure()))
        )
      )
    );
  });

  getNlpAccuracyLatest = createEffect(() => {
    return this.actions.pipe(
      ofType(getNlpAccuracyLatest),
      switchMap(({ elementName }) =>
        this.nlpService.getNlpAccuracyLatest(elementName).pipe(
          switchMap((nlpAccuracyLatest) =>
            of(getNlpAccuracyLatestSuccess({ nlpAccuracyLatest }))
          ),
          catchError(() => of(getNlpAccuracyLatestFailure()))
        )
      )
    );
  });
}
