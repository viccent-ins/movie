interface IAuthorisation {
    token: string,
    type: string,
    expires_in: number,
}
interface IAuthorizationResponse {
    Authorization: IAuthorisation,
}
interface ILoginResponse {
    Authorization: IAuthorisation,
    Message: string,
}

interface ILogin {
    email: string,
    password: string,
}

export {
    ILogin,
    ILoginResponse,
    IAuthorisation,
    IAuthorizationResponse,
};
