import { ActiveMember, IActiveMember, ICooperateFilm } from "../../models/home/IHome";
import { reactive, computed } from 'vue';
import api from "../../libraries/api";
import formHelper from '../../libraries/elementUiHelpers/formHelper';
import EnumApiErrorCode from "../../models/enums/enumApiErrorCode";
import useVariable from "../../composables/useVariable";
import uploadFileHelper from '../../libraries/uploadFileHelper';
import { useStores } from '../../store/store';
import messageBoxHelper from "../../libraries/elementUiHelpers/messageBoxHelper";
import EnumMessageType from "../../models/enums/enumMessageType";
export default function useCooperatedFilm() {
    const {
        isLoading,
        dialog,
        ruleFormRef,
        saveResponse,
    } = useVariable();
    const {
        handleExceed, file, upload,
        handleChange, handleRemove, renderFile,
    } = uploadFileHelper;
    const dataPagination = reactive({
        CooperateFilms: <ICooperateFilm[]>([]),
        CurrentPage: 1,
        PageSize: 10,
        Search: '',
        Total: 0,
    });
    const { apiServer } = useStores();
    const getCooperateFilm = async () => {
        isLoading.value = true;
        const response = await api.cooperateFilm();
        if (response.ErrorCode === EnumApiErrorCode.Success) {
            dataPagination.CooperateFilms = response.Data.CooperateFilms;
        }
        isLoading.value = false;
    };
    getCooperateFilm();
    const cooperateForm = reactive<ICooperateFilm>({
        id: 0,
        cooperate_file: '',
    });
    const rules = {
        level: { required: true },
        amount: { required: true },
        percentage: { required: true },
        return: { required: true },
    };
    const formRule = formHelper.getRules(rules);
    const reset = () => {
        cooperateForm.id = 0;
        cooperateForm.cooperate_file = '';
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
        const request: ICooperateFilm = {
            id: cooperateForm.id,
            cooperate_file: file.value,
        }
        const response = cooperateForm.id === 0 ? await api.addCooperateFilm(request) : await api.updateCooperateFilm(request);
        await saveResponse(response, getCooperateFilm);
        upload.value?.clearFiles();
        isLoading.value = false;
    };
    const onSubmit = formHelper.getSubmitFunction(save);
    const onEdit = (item: IActiveMember) => {
        dialog.value = true;
        cooperateForm.id = item.id;
    };
    const deleteProcess = async () => {
        const response = await api.deleteCooperateFilm(cooperateForm.id)
        await saveResponse(response, getCooperateFilm)
    };
    const onDelete = (id: number) => {
        cooperateForm.id = id;
        messageBoxHelper.confirm(EnumMessageType.Warning, deleteProcess)
    };
    const filterSearchPagination = computed(() => {
        return dataPagination.CooperateFilms.slice(dataPagination.PageSize * dataPagination.CurrentPage - dataPagination.PageSize, dataPagination.PageSize * dataPagination.CurrentPage);
    });
    return {
        isLoading,
        apiServer,
        onSubmit,
        onEdit,
        onDelete,
        dialog,
        handleClose,
        cooperateForm,
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
