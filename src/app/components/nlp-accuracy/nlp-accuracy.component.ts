import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NlpAccuracy } from '../../core/models/nlp-accuracy';
import { selectNlpAccuracy } from '../../state/global.selectors';

@Component({
  selector: 'app-nlp-accuracy',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatTableModule],
  templateUrl: './nlp-accuracy.component.html',
  styleUrl: './nlp-accuracy.component.scss',
})
export class NlpAccuracyComponent {
  selectNlpAccuracy: Observable<NlpAccuracy[]>;
  displayedColumns: string[] = [
    // 'nlpAccuracyId',
    // 'nlpId',
    'elementName',
    'accuracy',
    'documentCount',
    // 'createdDate',
  ];
  constructor(store: Store) {
    this.selectNlpAccuracy = store.select(selectNlpAccuracy);
  }
}
