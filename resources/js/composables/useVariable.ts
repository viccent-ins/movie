import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import EnumApiErrorCode from '../models/enums/enumApiErrorCode';
import notificationHelper from '../libraries/elementUiHelpers/notificationHelper';
import EnumMessageType from '../models/enums/enumMessageType';

const useVariable = () => {
  const isLoading = ref( false );
  const isProcessing = ref( false );
  const ruleFormRef = ref<FormInstance>();
  const dialog = ref( false );
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  };
  const saveResponse = async (response: any, func: () => void) => {
      if (response.ErrorCode === EnumApiErrorCode.Success) {
          notificationHelper.notification('រួចរាល់', EnumMessageType.Success);
          resetForm(ruleFormRef.value);
          dialog.value = false;
          await func();
          return true;
      } else {
          notificationHelper.notification('something went wrong', EnumMessageType.Error);
          return false
      }
  }
    return {
    isLoading,
    isProcessing,
    ruleFormRef,
    dialog,
    resetForm,
    saveResponse,
  };
};

export default useVariable;
