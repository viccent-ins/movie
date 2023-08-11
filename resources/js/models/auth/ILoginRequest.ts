interface IAuthorisation {
  token: string,
  type: string,
  expires_in: number,
}
interface IAuthorizationResponse {
  authorisation: IAuthorisation,
}
interface ILoginResponse {
  authorisation: IAuthorisation,
  message: string,
}

interface ILoginRequest {
  email: string,
  password: string,
}

export {
  ILoginRequest,
  ILoginResponse,
  IAuthorisation,
  IAuthorizationResponse,
};
