import { PromptRequest } from './prompt-request';

export interface NlpRequest extends PromptRequest {
  name: string;
  documentList: number[];
}
