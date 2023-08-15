import { ActiveMember, IActiveMember } from "../../models/home/IHome";
import { reactive, computed } from 'vue';
import api from "../../libraries/api";
import formHelper from '../../libraries/elementUiHelpers/formHelper';
import EnumApiErrorCode from "../../models/enums/enumApiErrorCode";
import useVariable from "../../composables/useVariable";
import uploadFileHelper from '../../libraries/uploadFileHelper';
import { useStores } from '../../store/store';
import messageBoxHelper from "../../libraries/elementUiHelpers/messageBoxHelper";
import EnumMessageType from "../../models/enums/enumMessageType";
export default function useActiveMember() {
    const {
        isLoading,
        dialog,
        resetForm,
        ruleFormRef,
        saveResponse,
    } = useVariable();
    const {
        handleExceed, file, upload,
        handleChange, handleRemove, renderFile,
    } = uploadFileHelper;
    const dataPagination = reactive({
        ActiveMembers: <IActiveMember[]>([]),
        CurrentPage: 1,
        PageSize: 10,
        Search: '',
        Total: 0,
    });
    const { apiServer } = useStores();
    const getActiveMember = async () => {
        isLoading.value = true;
        const response = await api.activeMember();
        if (response.ErrorCode === EnumApiErrorCode.Success) {
            dataPagination.ActiveMembers = response.Data.ActiveMembers.map((item: IActiveMember) => new ActiveMember(item));
        }
        isLoading.value = false;
    };
    getActiveMember();
    const activeForm = reactive<IActiveMember>({
        id: 0,
        member_id: null,
        member_profit: '',
        member_image: '',
    });
    const rules = {
        level: { required: true },
        amount: { required: true },
        percentage: { required: true },
        return: { required: true },
    };
    const formRule = formHelper.getRules(rules);
    const reset = () => {
        activeForm.id = 0;
        activeForm.member_id = null;
        activeForm.member_profit = '';
        activeForm.member_image = '';

    };
    const handleClose = () => {
        reset();
        upload.value?.clearFiles();
        file.value = '';
        dialog.value = !dialog.value;
    };
    const save = async () => {
        isLoading.value = true;
        await renderFile();
        const request: IActiveMember = {
            id: activeForm.id,
            member_id: activeForm.member_id,
            member_profit: activeForm.member_profit,
            member_image: file.value,
        }
        const response = activeForm.id === 0 ? await api.addActiveMember(request) : await api.updateActiveMember(request);
        await saveResponse(response, getActiveMember);
        isLoading.value = false;
    };
    const onSubmit = formHelper.getSubmitFunction(save);
    const onEdit = (item: IActiveMember) => {
        dialog.value = true;
        activeForm.id = item.id;
        activeForm.member_id = item.member_id;
        activeForm.member_profit = item.member_profit;
    };
    const deleteProcess = async () => {
        const response = await api.deleteActiveMember(activeForm.id)
        await saveResponse(response, getActiveMember)
    };
    const onDelete = (id: number) => {
        activeForm.id = id;
        messageBoxHelper.confirm(EnumMessageType.Warning, deleteProcess)
    };
    const filterSearchPagination = computed(() => {
        return dataPagination.ActiveMembers.slice(dataPagination.PageSize * dataPagination.CurrentPage - dataPagination.PageSize, dataPagination.PageSize * dataPagination.CurrentPage)
            // @ts-ignore
            .filter((data) => !dataPagination.Search || data.displayMemberId.toLowerCase().includes(dataPagination.Search.toLowerCase()));
    });
    return {
        isLoading,
        apiServer,
        onSubmit,
        onEdit,
        onDelete,
        dialog,
        handleClose,
        activeForm,
        formRule,
        ruleFormRef,
        upload,
        handleChange,
        handleExceed,
        handleRemove,
        filterSearchPagination,
        dataPagination,
    };
}
