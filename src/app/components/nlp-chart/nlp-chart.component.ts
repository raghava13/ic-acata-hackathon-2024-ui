import { Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BaseChartDirective } from 'ng2-charts';
import { selectNlpAccuracyLatest } from '../../state/global.selectors';

@Component({
  selector: 'app-nlp-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './nlp-chart.component.html',
  styleUrl: './nlp-chart.component.scss',
})
export class NlpChartComponent {
  private destroyRef = inject(DestroyRef);

  @Input({ required: true }) isElement: boolean = false;

  data: any = [];

  options: any;

  constructor(private store: Store) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.store
      .select(selectNlpAccuracyLatest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((elements) => {
        let label = '';
        let labels: any = [];
        if (elements.length) {
          label = this.isElement
            ? 'Elements Accuracy'
            : elements[0].elementName + ' Accuracy';
          labels = this.isElement
            ? elements.map((element) => element.elementName)
            : elements.map((element) => element.accuracy);
        }
        this.data = {
          labels,
          datasets: [
            {
              label,
              backgroundColor: documentStyle.getPropertyValue('--pink-500'),
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              data: elements.map((element) => element.accuracy),
            },
          ],
        };
      });

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
