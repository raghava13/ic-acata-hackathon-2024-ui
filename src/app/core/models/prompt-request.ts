export interface PromptRequest {
  template: string;
  knowledge: string;
  context?: string;
  userContent: string;
}
