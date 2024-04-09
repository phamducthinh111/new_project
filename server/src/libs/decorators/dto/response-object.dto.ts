export class ResponseObject<T> {
  success: boolean;
  data: T;
  message: string;

  static success<T>(data: T): ResponseObject<T> {
    return {
      success: true,
      data: data,
      message: null,
    };
  }

  static fail<T>(data: T, message: string): ResponseObject<T> {
    return {
      success: false,
      data: null,
      message: message,
    };
  }
}
