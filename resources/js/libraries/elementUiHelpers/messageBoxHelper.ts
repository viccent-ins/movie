import { ElMessageBox } from 'element-plus';
import EnumMessageType from '../../models/enums/enumMessageType';

const confirm = async (type: EnumMessageType, callback: () => void, content = 'Are you sure?', confirmButton= 'Yes') => {
  await ElMessageBox.confirm(content, {
    dangerouslyUseHTMLString: true,
    confirmButtonText: confirmButton,
    type,
    showCancelButton: false,
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        await callback();
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  });
};

export default {
  confirm
};
