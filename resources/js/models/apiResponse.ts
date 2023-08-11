import EnumApiErrorCode from '../models/enums/enumApiErrorCode';

export interface IApiResponse<T = any> {
  Data: T,
  ErrorCode: EnumApiErrorCode,
  Message: string,
}
export default class ApiResponse<T = any> implements IApiResponse {
  Data!: T;
  ErrorCode!: number;
  Message!: string;
  constructor( init:IApiResponse ) {
    Object.assign( this, init );
  }
}
