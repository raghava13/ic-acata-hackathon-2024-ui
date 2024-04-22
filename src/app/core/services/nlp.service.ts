import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../models/document';
import { NlpAccuracy } from '../models/nlp-accuracy';
import { NLPElement } from '../models/nlp-element';
import { NlpRequest } from '../models/nlp-request';
import { NlpResult } from '../models/nlp-result';
import { PromptRequest } from '../models/prompt-request';

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

  getNlpElement(nlpId: number): Observable<NLPElement[]> {
    const url = `${this.baseURL}/nlp/element/${nlpId}`;
    return this.httpClient.get<NLPElement[]>(url);
  }

  getNlpAccuracy(nlpId: number): Observable<NlpAccuracy[]> {
    const url = `${this.baseURL}/nlp/accuracy/${nlpId}`;
    return this.httpClient.get<NlpAccuracy[]>(url);
  }

  getNlpAccuracyLatest(elementName?: string): Observable<NlpAccuracy[]> {
    let url = `${this.baseURL}/nlp/latest/accuracy`;
    if (elementName) url += `/${elementName}`;
    return this.httpClient.get<NlpAccuracy[]>(url);
  }

  processPromptFinetuning(request: PromptRequest): Observable<string> {
    const url = `${this.baseURL}/nlp/prompt-tuning`;
    return this.httpClient.post<string>(url, request);
  }

  getDocuments(): Observable<Document[]> {
    const url = `${this.baseURL}/document`;
    return this.httpClient.get<Document[]>(url);
  }

  loadTemplate(template: string) {
    let url = `/assets/templates/${template}.json`;
    return this.httpClient.get<PromptRequest>(url);
  }
}
