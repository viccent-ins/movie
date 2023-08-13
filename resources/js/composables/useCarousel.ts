// import { ref } from 'vue';
// import EnumApiErrorCode from '@/models/enums/enumApiErrorCode';
// import enumApiErrorCode from '@/models/enums/enumApiErrorCode';
// import EnumMessageType from '@/models/enums/enumMessageType';
// import notificationHelper from '@/libraries/elementUiHelpers/notificationHelper';
// import apis from '@/libraries/api';
// import useVariable from './useVariable';
// import enumMessageType from '@/models/enums/enumMessageType';
// import messageBoxHelper from '@/libraries/elementUiHelpers/messageBoxHelper';

// export default function useCarousel() {
//   const carousels = ref<IFormData[]>([]);
//   const dialogPopUp = ref(false);
//   const { isLoading, ruleFormRef } = useVariable();
//   const {
//     onChange, clearImage, handleExceed, upload, image, imageName, removeSlipImage,
//   } = uploadHelper;
//   const getCarousels = async () => {
//     isLoading.value = true;
//     const response = await apis.getAllCarousel();
//     if (response.ErrorCode === EnumApiErrorCode.Success) {
//       carousels.value =  response.Data.Carousels;
//     }
//     isLoading.value = false;
//   };
//   getCarousels();
//   const uploadImage = async () => {
//     isLoading.value = true;
//     const request: IFormData = {
//       id: 0,
//       image: image.value,
//       image_name: imageName.value,
//     };
//     const response = await apis.addCarousel(request);
//     if (response.ErrorCode === EnumApiErrorCode.Success) {
//       notificationHelper.notification(response.Message, EnumMessageType.Success);
//       dialogPopUp.value = false;
//       getCarousels();
//       clearImage();
//     } else {
//       notificationHelper.notification(response.Message, EnumMessageType.Error);
//       clearImage();
//     }
//     isLoading.value = false;
//   };
//   const carouselId = ref<number>(0);
//   const deleteCarousel = async () => {
//     const response = await apis.deleteCarousel(carouselId.value);
//     if (response.ErrorCode === enumApiErrorCode.Success) {
//       notificationHelper.notification(response.Message, EnumMessageType.Success);
//       await getCarousels();
//     }
//     isLoading.value = false;
//   };
//   const onDelete = (id: number) => {
//     carouselId.value = id;
//     messageBoxHelper(enumMessageType.Warning, deleteCarousel, 'are you sure?');
//     // notificationHelper.notification('Are you sure?', enumMessageType.Warning);
//   };
//   return {
//     carousels,
//     dialogPopUp,
//     onChange,
//     handleExceed,
//     isLoading,
//     removeSlipImage,
//     image,
//     clearImage,
//     ruleFormRef,
//     onDelete,
//     deleteCarousel,
//     uploadImage,
//     upload,
//   };
// }
