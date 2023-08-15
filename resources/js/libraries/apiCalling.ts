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
import {
    IActiveMember,
    IActiveMemberResponse, ICooperateFilm,
    ICooperateFilmResponse,
    IQuestCorridor,
    IQuestCorridorResponse
} from "../models/home/IHome";
export default {
     async renewAxiosInstanceToken(authorisation: IAuthorisation) {
         const stores = useStores();
       await stores.updateAuthorisation(authorisation);
    },
    login: function(request: ILogin): IAxiosPromise<ILoginResponse> {
        const response = useApiBridge().instance.post(`login`, request);
        return response;
    },
    register(request: IRegisterRequest): IAxiosPromise<IRegisterResponse> {
        const response = useApiBridge().instance.post(`register`, request);
        return response;
    },
    changePassword: function(request: IChangePassword): IAxiosPromise<IBaseResponse> {
      const response = useApiBridge().instance.post(`changePassword`, request);
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
    addQuestCorridor(param: IQuestCorridor): IAxiosPromise<IQuestCorridorResponse> {
      const response = useApiBridge().instance.post('addQuestCorridor', param);
      return response;
   },
    questCorridor(): IAxiosPromise<IQuestCorridorResponse> {
      const response = useApiBridge().instance.get('getQuestCorridor');
      return response;
   },
    updateQuestCorridor(param: IQuestCorridor): IAxiosPromise<IQuestCorridorResponse> {
        const response = useApiBridge().instance.post(`updateQuestCorridor`, param);
        return response;
    },
    deleteQuestCorridor(id: number): IAxiosPromise<IQuestCorridorResponse> {
        const response = useApiBridge().instance.post(`deleteQuestCorridor`, {
            id: id
        });
        return response;
    },
    addActiveMember(param: IActiveMember): IAxiosPromise<IActiveMemberResponse> {
        const response = useApiBridge().instance.post('addActiveMember', param);
        return response;
    },
    activeMember(): IAxiosPromise<IActiveMemberResponse> {
        const response = useApiBridge().instance.get('getActiveMember');
        return response;
    },
    updateActiveMember(param: IActiveMember): IAxiosPromise<IActiveMemberResponse> {
        const response = useApiBridge().instance.post('updateActiveMember', param);
        return response;
    },
    deleteActiveMember(id: number): IAxiosPromise<IActiveMemberResponse> {
        const response = useApiBridge().instance.post('deleteActiveMember', {
            id: id
        });
        return response;
    },
    cooperateFilm(): IAxiosPromise<ICooperateFilmResponse> {
        const response = useApiBridge().instance.get('getCooperateFilms');
        return response;
    },
    addCooperateFilm(param: ICooperateFilm): IAxiosPromise<ICooperateFilmResponse> {
        const response = useApiBridge().instance.post('addCooperateFilm', param);
        return response;
    },
    updateCooperateFilm(param: ICooperateFilm): IAxiosPromise<ICooperateFilmResponse> {
        const response = useApiBridge().instance.post('updateCooperateFilm', param);
        return response;
    },
    deleteCooperateFilm(id: number): IAxiosPromise<ICooperateFilmResponse> {
        const response = useApiBridge().instance.post('deleteCooperateFilm', {
            id: id
        });
        return response;
    },
};
