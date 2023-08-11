interface IRegisterRequest {
    name: string,
    phone: number | string,
    email: string,
    password: string,
    password_confirmation: string,
}
interface IFacebookRegister extends IRegisterRequest {
  facebook_id: number,
  profile: string,
}
interface IGoogleRegister extends IRegisterRequest {
  google_id: number,
  profile: any,
}
interface IRegisterResponse {
  id: number,
  token: string,
  username: string,
  email: string,
  account_type: string,
  email_verified_at: string,
  created_at: number,
  updated_at: number,
  profile: string,
  phone: number | string,
}
interface IFacebookResponse extends IRegisterResponse {
  facebook_id: number,
}
interface IAuthorisation {
  token: string,
  type: string,
  expires_in: number,
}
interface IRegisterResponse {
    Authorization: IAuthorisation,
    Message: string,
}

export {
  IRegisterRequest,
  IRegisterResponse,
  IFacebookRegister,
  IFacebookResponse,
  IGoogleRegister,
};
