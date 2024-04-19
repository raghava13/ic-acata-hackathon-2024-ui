import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { selectSpinner } from './state/global.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private destroyRef = inject(DestroyRef);

  private spinnerRef: MatDialogRef<SpinnerComponent> | undefined;

  constructor(private dialog: MatDialog, private store: Store) {
    this.store
      .select(selectSpinner)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((spinner) => this.handleSpinner(spinner));
  }

  private handleSpinner(spinner: number) {
    if (spinner === 0) {
      this.spinnerRef?.close();
      this.spinnerRef = undefined;
    } else if (this.spinnerRef === undefined) {
      this.spinnerRef = this.dialog.open(SpinnerComponent, {
        panelClass: 'spinner-dialog',
        disableClose: true,
      });
    }
  }
}
