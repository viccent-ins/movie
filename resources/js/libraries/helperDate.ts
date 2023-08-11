import { ref } from 'vue';
import IDate from '../models/IHelper';
import moment from 'moment';

const helperDate = () => {
    const currentMonth = ref<IDate>({
        startDate: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    });
    const shortcutsMonths = [
        {
            text: 'ខែនេះ',
            value: {
                startDate: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                endDate: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
            }
        },
        {
            text: '១ខែមុន',
            value: {
                startDate: moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                endDate: moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
            },
        },
        {
            text: '២ខែមុន',
            value: {
                startDate: moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                endDate: moment().subtract(2, 'months').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
            },
        },
    ];
    const currentDay = ref(moment().format('DD-MM-YYYY HH:mm a'));
    const currentTimeWithSecond = ref(moment().format('LTS'));
    return {
        currentMonth,
        shortcutsMonths,
        currentDay,
        currentTimeWithSecond,
  };
};

export default helperDate;
