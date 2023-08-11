import { useApiBridge } from "../axios/axios";
import { IAxiosPromise } from '../models/axiosPromise';
import { IAuthorisation, IAuthorizationResponse, ILogin, ILoginResponse } from '../models/auth/ILogin';
import {
  IFacebookRegister,
  IGoogleRegister,
  IRegisterRequest,
  IRegisterResponse
} from "../models/auth/IRegisterRequest";
import IApiResponse from '../models/apiResponse';
import { IProfile, IUpdateUser, IUserResponse, IUserWithPaginate } from "../models/auth/IUser";
import { IChangePassword } from "../models/auth/IChangePassword";
import IBaseResponse from "../models/IBaseResponse";
import IResetPassword from "../models/auth/IResetPassword";
import { useStores } from "../store/store";

export default {
     async renewAxiosInstanceToken(authorisation: IAuthorisation) {
       const stores = useStores();
       await stores.updateAuthorisation(authorisation);
       navigateTo('/profile');
    },
    login: function(request: ILogin): IAxiosPromise<ILoginResponse> {
        const response = useApiBridge().instance.post(`login`, request);
        return response;
    },
    register(request: IRegisterRequest): IAxiosPromise<IRegisterResponse> {
        const response = useApiBridge().instance.post(`register`, request);
        return response;
    },
   updateUser(request: IUpdateUser): IAxiosPromise<IRegisterResponse> {
        const response = useApiBridge().instance.post(`updateProfile`, request);
        return response;
    },
    changePassword: function(request: IChangePassword): IAxiosPromise<IBaseResponse> {
      const response = useApiBridge().instance.post(`changePassword`, request);
      return response;
    },
    registerWithFacebook(request: IFacebookRegister): IAxiosPromise<ILoginResponse> {
        const response = useApiBridge().instance.post(`registerWithFacebook`, request);
        return response;
    },
    registerWithGoogle(request: IGoogleRegister): IAxiosPromise<ILoginResponse> {
        const response = useApiBridge().instance.post(`registerWithGoogle`, request);
        return response;
    },
    logout(): IAxiosPromise<IApiResponse> {
        const response = useApiBridge().instance.post(`logout`);
        return response;
    },
    refreshToken(): IAxiosPromise<IAuthorizationResponse> {
        return useApiBridge().instance.get(`refresh`);
    },
    async getProfile(): IAxiosPromise<IProfile> {
      const response = await useApiBridge().instance.get(`getProfile`);
      return response;
    },
    getUsers(currentPage: number): IAxiosPromise<IUserWithPaginate> {
        const response = useApiBridge().instance.get(`getUsers?page=${currentPage}`);
        return response;
    },
    verifyNotification(): IAxiosPromise<IBaseResponse> {
      const response = useApiBridge().instance.post(`email/verification-notification`);
      return response;
    },
    verificationNotification(id: number, token: string): IAxiosPromise<IBaseResponse> {
      const response = useApiBridge().instance.get(`verify-email/${id}/${token}`);
      return response;
   },
    forgotPassword(param: string): IAxiosPromise<IBaseResponse> {
        const response = useApiBridge().instance.post(`forgot-password`,{
          email: param,
        }
        );
        return response;
   },
    resetPassword(param: IResetPassword): IAxiosPromise<IBaseResponse> {
      const response = useApiBridge().instance.post(`reset-password`, param);
      return response;
   },
};
