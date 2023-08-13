// import { computed, reactive, ref } from 'vue';
// import EnumApiErrorCode from '../models/enums/enumApiErrorCode';
// import apis from '../libraries/api';
// import useVariable from './useVariable';
// import formHelper from '../libraries/elementUiHelpers/formHelper';
// import helperDate from '../libraries/helperDate';
// import confirm from '../libraries/elementUiHelpers/messageBoxHelper';
// import EnumMessageType from '../models/enums/enumMessageType';

// export default function useCategory() {
//     const {
//         isLoading, ruleFormRef, resetForm,
//         width, saveResponse, dialog,
//     } = useVariable();
//     const { currentDay } = helperDate();
//     const labelPosition = ref('top');
//     const formCategory = reactive<ICategory>({
//         id: 0,
//         cat_name: '',
//     })
//     const handleClose = () => {
//         resetForm(ruleFormRef.value);
//         dialog.value = !dialog.value;
//     };
//     const categoryData = ref({
//         DataTable: <IGetCategory[]>([]),
//         CurrentPage: 1,
//         PageSize: 10,
//         Search: '',
//     });
//     const rules = {
//         cat_name: { required: true },
//     };
//     const formRule = formHelper.getRules(rules);
//     const getCategory = async () => {
//         const response = await apis.getCategory();
//         if (response.ErrorCode === EnumApiErrorCode.Success) {
//             categoryData.value.DataTable = response.Data.Categories.map((item: IGetCategory) => new Category(item));
//         }
//     }
//     getCategory();
//     const dataFilterPaginationSearch = computed(() => {
//         return categoryData.value.DataTable.slice(categoryData.value.PageSize * categoryData.value.CurrentPage - categoryData.value.PageSize, categoryData.value.PageSize * categoryData.value.CurrentPage)
//         .filter((data) =>!categoryData.value.Search || data.cat_name.toLowerCase().includes(categoryData.value.Search.toLowerCase()));
//     });
//     const addCategory = async () => {
//        const request: ICategory = {
//            id: formCategory.id,
//            cat_name: formCategory.cat_name,
//        }
//        const response = formCategory.id === 0 ? await apis.addCategory(request) : await apis.updateCategory(request);
//        await saveResponse(response, getCategory);
//     };
//     const onSubmit = formHelper.getSubmitFunction(addCategory);
//     const onEdit = (param: IGetCategory) => {
//         dialog.value = !dialog.value;
//         formCategory.id = param.id;
//         formCategory.cat_name = param.cat_name;
//     };
//     const deleteProcess = async () => {
//         const response = await apis.deleteCategory(formCategory.id)
//         await saveResponse(response, getCategory)
//     };
//     const onDelete = (id: number) => {
//         formCategory.id = id;
//         confirm(EnumMessageType.Warning, deleteProcess, 'ច្បាស់ហើយ?');
//     };
//     return {
//         currentDay,
//         dialog,
//         dataFilterPaginationSearch,
//         width,
//         labelPosition,
//         formRule,
//         ruleFormRef,
//         onSubmit,
//         isLoading,
//         handleClose,
//         categoryData,
//         formCategory,
//         onEdit,
//         onDelete,
//     };
// }
