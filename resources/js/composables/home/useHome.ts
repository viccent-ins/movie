import { IQuestCorridor } from "../../models/home/IHome";
import { reactive, ref, computed } from 'vue';
import api from "../../libraries/api";
import formHelper from '../../libraries/elementUiHelpers/formHelper';
import EnumApiErrorCode from "../../models/enums/enumApiErrorCode";
import useVariable from "../../composables/useVariable";
import uploadFileHelper from '../../libraries/uploadFileHelper';
import { useStores } from '../../store/store';
import messageBoxHelper from "../../libraries/elementUiHelpers/messageBoxHelper";
import EnumMessageType from "../../models/enums/enumMessageType";
export default function useHome() {
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
        QuestCorridors: <IQuestCorridor[]>([]),
        CurrentPage: 1,
        PageSize: 10,
        Search: '',
        Total: 0,
    });
    const { apiServer } = useStores();
    const getQuestCorridor = async () => {
        isLoading.value = true;
        const response = await api.questCorridors();
        if (response.ErrorCode === EnumApiErrorCode.Success) {
            dataPagination.QuestCorridors = response.Data.QuestCorridor;
            file.value = null;
        }
        isLoading.value = false;
    };
    getQuestCorridor();
    const questForm = reactive<IQuestCorridor>({
        id: 0,
        level: '',
        amount: null,
        percentage: '',
        return: '',
        file: '',
    });
    const rules = {
        level: { required: true },
        amount: { required: true },
        percentage: { required: true },
        return: { required: true },
    };
    const formRule = formHelper.getRules(rules);
    const save = async () => {
        isLoading.value = true;
        await renderFile();
        const request: IQuestCorridor = {
            id: questForm.id,
            level: questForm.level,
            amount: questForm.amount,
            percentage: questForm.percentage,
            return: questForm.return,
            file: file.value,
        }
        const response = questForm.id === 0 ? await api.addQuestCorridor(request) : await api.updateQuestCorridor(request);
        await saveResponse(response, getQuestCorridor);
        isLoading.value = false;
    };
    const onSubmit = formHelper.getSubmitFunction(save);
    const onEdit = (item: IQuestCorridor) => {
        dialog.value = true;
        questForm.id = item.id;
        questForm.level = item.level;
        questForm.amount = item.amount;
        questForm.percentage = item.percentage;
        questForm.return = item.return;
        questForm.file = item.file;
    };
    const handleClose = () => {
        resetForm(ruleFormRef.value);
        dialog.value = !dialog.value;
        questForm.id = 0;
        upload.value!.clearFiles();
    };
    const deleteProcess = async () => {
        const response = await api.deleteQuestCorridor(questForm.id)
        await saveResponse(response, getQuestCorridor)
    };
    const onDelete = (id: number) => {
        questForm.id = id;
        messageBoxHelper.confirm(EnumMessageType.Warning, deleteProcess)
    };
    const filterSearchPagination = computed(() => {
        return dataPagination.QuestCorridors.slice(dataPagination.PageSize * dataPagination.CurrentPage - dataPagination.PageSize, dataPagination.PageSize * dataPagination.CurrentPage)
            .filter((data) =>!dataPagination.Search || data.level.toLowerCase().includes(dataPagination.Search.toLowerCase()));
    });
    return {
        isLoading,
        apiServer,
        onSubmit,
        onEdit,
        onDelete,
        dialog,
        handleClose,
        questForm,
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
