import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NlpAccuracy } from '../models/nlp-accuracy';
import { NlpRequest } from '../models/nlp-request';
import { NlpResult } from '../models/nlp-result';

@Injectable({
  providedIn: 'root',
})
export class NlpService {
  baseURL: string;
  constructor(private httpClient: HttpClient) {
    this.baseURL = 'http://127.0.0.1:8000';
  }

  processNlp(request: NlpRequest): Observable<number> {
    const url = `${this.baseURL}/nlp/process`;
    return this.httpClient.post<number>(url, request);
  }

  getNlpResult(nlpId: number): Observable<NlpResult[]> {
    const url = `${this.baseURL}/nlp/result/${nlpId}`;
    return this.httpClient.get<NlpResult[]>(url);
  }

  getNlpAccuracy(nlpId: number): Observable<NlpAccuracy[]> {
    const url = `${this.baseURL}/nlp/accuracy/${nlpId}`;
    return this.httpClient.get<NlpAccuracy[]>(url);
  }

  getNlpAccuracyLatest(elementName?: string): Observable<NlpAccuracy[]> {
    let url = `${this.baseURL}/nlp/latest/accuracy`;
    if (elementName) url += `/${elementName}`;
    console.log('raghava', url);
    return this.httpClient.get<NlpAccuracy[]>(url);
  }
}
