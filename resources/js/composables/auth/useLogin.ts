import { reactive } from 'vue';
import EnumApiErrorCode from '../../models/enums/enumApiErrorCode';
import EnumMessageType from '../../models/enums/enumMessageType';
import apis from '../../libraries/api';
import useVariable from '../useVariable';
import { ILogin } from '../../models/auth/ILogin'
import notificationHelper from '../../libraries/elementUiHelpers/notificationHelper';
import formHelper, { IRule } from '../../libraries/elementUiHelpers/formHelper';
import { useRouter } from "vue-router";
export default function useLogin () {
    const { isProcessing, ruleFormRef } = useVariable();
    const loginRequest = reactive<ILogin>({
        phone: '',
        password: '',
    });
    const router = useRouter();
    const login = async () => {
        isProcessing.value = false;
        const response = await apis.login(loginRequest);
        if (response.ErrorCode === EnumApiErrorCode.Success) {
            notificationHelper.notification('Login Success!', EnumMessageType.Success);
            await router.push('/');
        } else {
            notificationHelper.notification('Phone or password is incorrect', EnumMessageType.Error);
        }
        isProcessing.value = false;
    };
    // const validateEmail = (): string => {
    //     if (!(loginRequest.email.trim() === loginRequest.email)) {
    //         return 'White space not allow';
    //     }
    //     // eslint-disable-next-line
    //     const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    //     if (!(regexp.test(loginRequest.email.toLowerCase()))) {
    //         return 'Invalid Email';
    //     }
    //     return '';
    // };
    const validatePassword = (): string => {
        if (!(loginRequest.password.trim() === loginRequest.password)) {
            return 'White space not allow';
        }
        return '';
    };
    const rules: Record<string, IRule> = {
        phone: { required: true },
        password: { customRule: validatePassword, required: true },
    };
    const loginRule = formHelper.getRules(rules);
    const onLogin = formHelper.getSubmitFunction(login);
    return {
        loginRule,
        onLogin,
        ruleFormRef,
        loginRequest,
        isProcessing,
    };
};
