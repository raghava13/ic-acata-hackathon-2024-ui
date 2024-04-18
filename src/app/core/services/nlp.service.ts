import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NlpRequest } from '../models/nlp-request';

@Injectable({
  providedIn: 'root',
})
export class NlpService {
  baseURL: string;
  constructor(private httpClient: HttpClient) {
    this.baseURL = 'http://127.0.0.1:8000';
  }

  processNLP(request: NlpRequest) {
    const url = `${this.baseURL}/nlp`;
    return this.httpClient.post(url, request);
  }
}
