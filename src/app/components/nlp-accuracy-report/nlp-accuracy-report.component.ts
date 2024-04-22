import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NlpAccuracy } from '../../core/models/nlp-accuracy';
import {
  getNlpAccuracyLatest,
  resetNlpAccuracyLatest,
} from '../../state/global.actions';
import { selectNlpAccuracyLatest } from '../../state/global.selectors';
import { NlpChartComponent } from '../nlp-chart/nlp-chart.component';

@Component({
  selector: 'app-nlp-accuracy-report',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    NlpChartComponent,
  ],
  templateUrl: './nlp-accuracy-report.component.html',
  styleUrl: './nlp-accuracy-report.component.scss',
})
export class NlpAccuracyReportComponent {
  selectNlpAccuracyLatest: Observable<NlpAccuracy[]>;
  displayedColumns: string[] = [
    // 'nlpAccuracyId',
    // 'nlpId',
    'elementName',
    'accuracy',
    'documentCount',
    // 'createdDate',
  ];

  element_list = [
    'cancer_grade',
    'cancer_histology',
    'cancer_m_value',
    'cancer_n_value',
    'cancer_stage',
    'cancer_t_value',
    'date_of_biopsy',
    'metastatic_date',
    'progression_date',
    'sample_type',
    'site_of_biopsy',
    'specimen_collection_date',
    'surgery_date',
    'surgery_type',
    'test_category',
    'test_name',
    'test_ordered_date',
    'test_result',
    'test_results_date',
    'test_type',
    'testing_company',
    'cancer_grade',
    'cancer_histology',
    'cancer_m_value',
    'cancer_n_value',
    'cancer_stage',
    'cancer_t_value',
    'date_of_biopsy',
    'metastatic_date',
    'progression_date',
    'sample_type',
    'site_of_biopsy',
    'specimen_collection_date',
    'surgery_date',
    'surgery_type',
    'test_category',
    'test_name',
    'test_ordered_date',
    'test_result',
    'test_results_date',
    'test_type',
    'testing_company',
  ];
  constructor(private store: Store) {
    this.selectNlpAccuracyLatest = store.select(selectNlpAccuracyLatest);
    store.dispatch(getNlpAccuracyLatest({}));
  }

  handleChange(all: boolean) {
    if (all) {
      this.store.dispatch(getNlpAccuracyLatest({}));
    } else {
      this.store.dispatch(resetNlpAccuracyLatest());
    }
  }

  handleSelectionChange(elementName: string) {
    if (elementName) {
      this.store.dispatch(getNlpAccuracyLatest({ elementName }));
    } else {
      this.store.dispatch(resetNlpAccuracyLatest());
    }
  }
}
