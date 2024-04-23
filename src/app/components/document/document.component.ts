import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Document } from '../../core/models/document';
import { getDocuments } from '../../state/global.actions';
import {
  selectDocumentFiltered,
  selectDocuments,
} from '../../state/global.selectors';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [
    AsyncPipe,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent {
  selectDocumentFiltered: Observable<Document[]>;
  displayedColumns: string[] = [
    'documentId',
    'patientId',
    'type',
    'name',
    'add',
  ];

  documentList: number[] = [];

  constructor(private store: Store, public dialog: MatDialog) {
    this.selectDocumentFiltered = store.select(selectDocumentFiltered(''));
    store
      .select(selectDocuments)
      .pipe(take(1))
      .subscribe((documents) => {
        if (!documents.length) {
          store.dispatch(getDocuments());
        }
      });
  }

  handleSearch(keyword: string) {
    this.selectDocumentFiltered = this.store.select(
      selectDocumentFiltered(keyword)
    );
  }

  handleAddDocument(documentId: number) {
    this.documentList.push(documentId);
  }
}
