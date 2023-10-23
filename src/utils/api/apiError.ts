export interface APIErrorData {
  status: number;
  message: string;
}

class APIError {
  private _status = 400;

  private _message = "unknown";

  // 어떤 데이터가 들어올지 모르기 때문에 any 사용
  // eslint-disable-next-line
  constructor(error?: any) {
    this.setError(error);
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }

  public getData(): APIErrorData {
    return {
      status: this._status,
      message: this._message,
    };
  }

  public setStatus(status?: number) {
    if (!status || typeof status !== "number") {
      return this;
    }

    this._status = status;

    return this;
  }

  // eslint-disable-next-line
  public setMessage(message?: any) {
    if (!message || typeof message !== "string") {
      return this;
    }

    this._message = message;

    return this;
  }

  // 어떤 데이터가 들어올지 모르기 때문에 any 사용
  // eslint-disable-next-line
  public setError(error: any) {
    if (!error || typeof error !== "object") {
      return this;
    }

    this.setStatus(error.status);
    this.setMessage(error.message);

    return this;
  }
}

export default APIError;
