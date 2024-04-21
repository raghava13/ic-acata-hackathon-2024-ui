import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NLPElement } from '../../core/models/nlp-element';
import { selectNlpElement } from '../../state/global.selectors';

@Component({
  selector: 'app-nlp-element',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatTableModule],
  templateUrl: './nlp-element.component.html',
  styleUrl: './nlp-element.component.scss',
})
export class NlpElementComponent {
  selectNlpElement: Observable<NLPElement[]>;
  displayedColumns: string[] = [
    'documentId',
    'elementName',
    'groundTruth',
    'rawValue',
  ];

  constructor(store: Store) {
    this.selectNlpElement = store.select(selectNlpElement);
  }
}
