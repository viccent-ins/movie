import enumMessageStatus from '../../models/enums/enumMessageType';
import { ElNotification } from 'element-plus';

const notification = ( message: string, type: enumMessageStatus, title?:string ): void => {
  ElNotification( {
    title,
    message: message,
    type,
    duration: 3000,
  } );
};
export default {
  notification,
};
