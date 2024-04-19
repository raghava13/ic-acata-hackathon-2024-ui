import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NlpResult } from '../../core/models/nlp-result';
import { selectNlpResult } from '../../state/global.selectors';
import { NlpJsonComponent } from '../nlp-json/nlp-json.component';

@Component({
  selector: 'app-nlp-result',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatTableModule],
  templateUrl: './nlp-result.component.html',
  styleUrl: './nlp-result.component.scss',
})
export class NlpResultComponent {
  selectNlpResult: Observable<NlpResult[]>;
  displayedColumns: string[] = [
    // 'nlpDocumentId',
    // 'nlpId',
    'documentId',
    'response',
    // 'createdDate',
  ];

  constructor(store: Store, public dialog: MatDialog) {
    this.selectNlpResult = store.select(selectNlpResult);
  }

  openDialog(data: string) {
    this.dialog.open(NlpJsonComponent, {
      data,
    });
  }
}
