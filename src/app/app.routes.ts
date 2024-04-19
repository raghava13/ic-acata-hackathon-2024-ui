import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NlpAccuracyReportComponent } from './components/nlp-accuracy-report/nlp-accuracy-report.component';
import { PromptTuningComponent } from './components/prompt-tuning/prompt-tuning.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'report',
    component: NlpAccuracyReportComponent,
  },
  {
    path: 'prompt',
    component: PromptTuningComponent,
  },
  { path: '**', redirectTo: 'home' },
];
