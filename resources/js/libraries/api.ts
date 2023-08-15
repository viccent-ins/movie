import { IAxiosPromise } from '../models/axiosPromise';
import ApiResponse from '../models/apiResponse';
import { ILogin, ILoginResponse } from '../models/auth/ILogin';
import apiCalling from './apiCalling';
import { IRegisterRequest, IRegisterResponse } from "../models/auth/IRegisterRequest";
import IBaseResponse from '../models/IBaseResponse';
import { IProfile, IUpdateUser, IUserResponse, IUserWithPaginate } from "../models/auth/IUser";
import { IChangePassword } from "../models/auth/IChangePassword";
import IResetPassword from "../models/auth/IResetPassword";
import { IQuestCorridor, IQuestCorridorResponse } from "../models/home/IHome";

const getResponse = (response: IAxiosPromise) => response.then((value) => new ApiResponse(value.data)).catch((error) => new ApiResponse(error.data));
export default {
    async refreshToken(): Promise<void> {
      const response = await apiCalling.refreshToken();
      await apiCalling.renewAxiosInstanceToken(response.data.Data.Authorization);
    },
    register(request: IRegisterRequest): Promise<ApiResponse<IRegisterResponse>> {
        const response = apiCalling.register(request);
        response.then(async (value) => {
          await apiCalling.renewAxiosInstanceToken(value.data.Data.Authorization)
        })
        return getResponse(response);
      },
    login(request: ILogin): Promise<ApiResponse<ILoginResponse>> {
        const response = apiCalling.login(request);
        response.then(async (value) => {
          await apiCalling.renewAxiosInstanceToken(value.data.Data.Authorization)
        })
        return getResponse(response);
      },
    changePassword(request: IChangePassword): Promise<ApiResponse<IBaseResponse>> {
      const response = getResponse(apiCalling.changePassword(request));
      return response;
    },
    logout(): Promise<ApiResponse<IBaseResponse>> {
        const response = apiCalling.logout();
        return getResponse(response);
      },
    getProfile(): Promise<ApiResponse<IProfile>> {
      const response = getResponse(apiCalling.getProfile());
      return response;
    },
    getUsers(currentPage: number): Promise<ApiResponse<IUserWithPaginate>>{
        const response = apiCalling.getUsers(currentPage);
        return getResponse(response);
    },
    forgotPassword(email: string): Promise<ApiResponse<IBaseResponse>> {
      const response = apiCalling.forgotPassword(email);
      return getResponse(response);
    },
    resetPassword(param: IResetPassword): Promise<ApiResponse<IBaseResponse>> {
      const response = apiCalling.resetPassword(param);
      return getResponse(response);
    },
    addQuestCorridor(param: IQuestCorridor): Promise<ApiResponse<IQuestCorridorResponse>> {
      const response = apiCalling.addQuestCorridor(param);
      return getResponse(response);
    },
    questCorridors(): Promise<ApiResponse<IQuestCorridorResponse>> {
      const response = apiCalling.questCorridors();
      return getResponse(response);
    },
    updateQuestCorridor(param: IQuestCorridor): Promise<ApiResponse<IQuestCorridorResponse>> {
      const response = apiCalling.updateQuestCorridor(param);
      return getResponse(response);
    },
    deleteQuestCorridor(id: number): Promise<ApiResponse<IBaseResponse>> {
      const response = apiCalling.deleteQuestCorridor(id);
      return getResponse(response);
    },
};
