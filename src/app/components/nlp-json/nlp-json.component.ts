import { JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nlp-json',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './nlp-json.component.html',
  styleUrl: './nlp-json.component.scss',
})
export class NlpJsonComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
