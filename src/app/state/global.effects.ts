import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { NlpService } from '../core/services/nlp.service';
import {
  getDocuments,
  getDocumentsFailure,
  getDocumentsSuccess,
  getNlpAccuracy,
  getNlpAccuracyFailure,
  getNlpAccuracyLatest,
  getNlpAccuracyLatestFailure,
  getNlpAccuracyLatestSuccess,
  getNlpAccuracySuccess,
  getNlpElement,
  getNlpElementFailure,
  getNlpElementSuccess,
  getNlpResult,
  getNlpResultFailure,
  getNlpResultSuccess,
  processPromptFinetuning,
  processPromptFinetuningFailure,
  processPromptFinetuningSuccess,
} from './global.actions';

@Injectable()
export class GlobalEffects {
  constructor(private actions: Actions, private nlpService: NlpService) {}

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

  getNlpElement = createEffect(() => {
    return this.actions.pipe(
      ofType(getNlpElement),
      switchMap(({ nlpId }) =>
        this.nlpService.getNlpElement(nlpId).pipe(
          switchMap((nlpElement) => of(getNlpElementSuccess({ nlpElement }))),
          catchError(() => of(getNlpElementFailure()))
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

  processPromptFinetuning = createEffect(() => {
    return this.actions.pipe(
      ofType(processPromptFinetuning),
      switchMap(({ request }) =>
        this.nlpService.processPromptFinetuning(request).pipe(
          switchMap((prompt) => of(processPromptFinetuningSuccess({ prompt }))),
          catchError(() => of(processPromptFinetuningFailure()))
        )
      )
    );
  });

  getDocuments = createEffect(() => {
    return this.actions.pipe(
      ofType(getDocuments),
      switchMap(() =>
        this.nlpService.getDocuments().pipe(
          switchMap((documents) => of(getDocumentsSuccess({ documents }))),
          catchError(() => of(getDocumentsFailure()))
        )
      )
    );
  });
}
