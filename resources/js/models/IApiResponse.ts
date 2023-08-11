import EnumApiErrorCode from './enums/enumApiErrorCode';

interface IErrorPair {
    Code: EnumApiErrorCode
    Message: string
}
export default interface IApiResponse<T> {
    Data: T
    Error: IErrorPair
}
