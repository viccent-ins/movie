// @ts-ignore
import axios from 'axios';
import notificationHelper from "../libraries/elementUiHelpers/notificationHelper";
import EnumMessageType from "../models/enums/enumMessageType";
import { useStores } from '../store/store';
import { storeToRefs } from "pinia";

export const useApiBridge = () => {
    const stores = useStores();
    const { authorisation, apiServer } = storeToRefs(stores);
    const instance = axios.create({
        baseURL: `${apiServer.value}api/`,
        headers: { Authorization: `Bearer ${authorisation.value.token}`},
    });
    instance.interceptors.response.use(
        (response: any) => response,
        (error: { response: { status: number; data: { message: string; }; statusText: string; }; }) => {
            if (error.response?.status === 422) {
                // @ts-ignore
                notificationHelper.notification(error.response.data?.errors.Message[0], EnumMessageType.Error);
            }
            if (error.response?.status === 401) {
                let keysToRemove = ['store'];
                keysToRemove.forEach((key) => {
                    localStorage.removeItem(key);
                });
                navigateTo('/auth/login');
                // window.location.href = '/auth/login';
            }
            if (error.response?.status === 500) {
                notificationHelper.notification(error.response?.statusText, EnumMessageType.Error);
            }
            Promise.reject(error);
        },
    );
    return {
        instance,
    }
}
