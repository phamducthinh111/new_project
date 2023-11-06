export class ResponseObject {
  success: boolean;
  data: any;
  message: string;

  static success(data: any): ResponseObject {
    return {
      success: true,
      data: data,
      message: null,
    };
  }

  static fail(message: string): ResponseObject {
    return {
      success: false,
      data: null,
      message: message,
    };
  }

  static error(data: any): ResponseObject {
    return {
      success: false,
      data: data,
      message: null,
    };
  }
}
