export interface PromptRequest {
  temperature: number;
  topP: number;
  maxTokens: number;
  template: string;
  knowledge: string;
  context?: string;
  userContent: string;
}
