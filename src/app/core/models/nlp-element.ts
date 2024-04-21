export interface NLPElement {
  nlpDocumentElementId: number;
  nlpDocumentId: number;
  documentId: number;
  elementName: string;
  groundTruth: string;
  rawValue: string;
  createdDate: Date;
}
