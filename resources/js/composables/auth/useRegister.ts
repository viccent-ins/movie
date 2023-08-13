import { reactive } from 'vue';
import notificationHelper from '../../libraries/elementUiHelpers/notificationHelper';
import apis from '../../libraries/api';
import { IRegisterRequest } from '../../models/auth/IRegisterRequest';
import EnumApiErrorCode from '../../models/enums/enumApiErrorCode';
import EnumMessageType from '../../models/enums/enumMessageType';
import useVariable from '../useVariable';
import formHelper, { IRule } from '../../libraries/elementUiHelpers/formHelper';
import { instance } from '../../axios/axios';

export default function useRegister() {
    const { isProcessing, ruleFormRef } = useVariable();
    const registerRequest = reactive<IRegisterRequest>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    // const { commit, state } = useStore();
    const register = async () => {
        isProcessing.value = true;
        const response = await apis.register(registerRequest);
        if (response.ErrorCode === EnumApiErrorCode.Success) {
            notificationHelper.notification('Success', EnumMessageType.Success);
            // await commit('updateAuthorisation', response.Data.Authorization);
            // await commit('updateAuth', true);
            // instance.defaults.headers.Authorization = `Bearer ${state.authorisation.token}`
            navigateTo('/')
        } else if (response.ErrorCode === 2) {
            notificationHelper.notification('Email or password incorrect', EnumMessageType.Error);
        }
        isProcessing.value = false;
    }
    const validateName = (): string => {
        if (!registerRequest.name) {
            return 'Name required!';
        }
        return '';
    };
    const validateEmail = (): string => {
        if (!(registerRequest.email.trim() === registerRequest.email)) {
            return 'White space not allow';
        }
        return '';
    };
    const validatePassword = (): string => {
        if (!(registerRequest.password.trim() === registerRequest.password)) {
            return 'White space not allow';
        }
        return '';
    };
    const validatePasswordConfirmation = (): string => {
        if (!(registerRequest.password_confirmation.trim() === registerRequest.password_confirmation)) {
            return 'White space not allow';
        }
        return '';
    };
    const rules: Record<string, IRule> = {
        name: { customRule: validateName, required: true },
        email: { customRule: validateEmail, required: true },
        password: { customRule: validatePassword, required: true },
        password_confirmation: { customRule: validatePasswordConfirmation, required: true },
    };
    const registerRule = formHelper.getRules(rules);
    const onRegister = formHelper.getSubmitFunction(register);
    return {
        registerRule,
        onRegister,
        ruleFormRef,
        registerRequest,
        isProcessing,
    };
}
