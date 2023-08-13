import { onMounted } from 'vue';
import useVariable from './useVariable';
import helperDate from '../libraries/helperDate';
export default function useDashboard() {
    const {
        isLoading
    } = useVariable();
    // const { currentMonth, shortcutsMonths } = helperDate();
    // const totalSalary = store.state.totalSalary;
    // const totalSpendMonthly = store.state.totalSpend;
    // const totalGood = store.state.totalGood;
    // const totalPos = store.state.totalPos;
    // const userType = store.state.authorisation.type;
    // onMounted(() => {
    //     if (!store.state.authorisation.token) {
    //         router.visit('/login');
    //     }
    // })
    // const getMonthlyData = async () => {
    //   isLoading.value = true;
    //   const response = await apis.getSalary(currentMonth.value);
    //   if (response.ErrorCode === EnumApiErrorCode.Success) {
    //     salaryData.value.DataTable = response.Data.Salaries.map((item: IGetSalary) => new Salary(item));
    //       salaryData.value.Total = response.Data.Total;
    //   }
    //   isLoading.value = false;
    // };
    // getMonthlyData();
    return {
        // isLoading,
        // currentMonth,
        // shortcutsMonths,
        // totalSalary,
        // totalSpendMonthly,
        // totalGood,
        // totalPos,
        // userType,
    };
}
