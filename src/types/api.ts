export interface ApiError {
  message: string;
  code: number;
}

export interface StackFrames {
  fileName: string;
  filePath: string;
  function: string;
  line: number;
}

export interface ExceptionDetails {
  message: string;
  raw: string;
  stackFrames: StackFrames[];
  type: string;
}

export interface ResponseData {
  detail: string;
  exceptionDetails: ExceptionDetails[];
  status: StatusCode;
  title: string;
  traceId: string;
  type: string;
}

export enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  Duplicate = 409,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export enum HttpStatus {
  EMPTY = "",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export interface HttpPayloadAction {
  response: {
    data: ResponseData | string;
  };
}

export interface HttpMeta<T> {
  arg: T;
  requestId: string;
  requestStatus: string;
  aborted: boolean;
  condition: boolean;
}
