export interface IMongoErrorResponse {
  statusCode: number | string;
  path: string;
  errorType: string;
  errorMessage: string;
}
