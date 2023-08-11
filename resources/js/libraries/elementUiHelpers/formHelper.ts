/* eslint-disable */
import { computed, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
const getValidator = (rule: () => string) => {
  const ruleForElementUI = (_: any, __: string, callback: any) => {
    const result = rule();
    if (result !== '') {
      return callback(new Error(result));
    }
    return callback();
  };
  return ruleForElementUI;
};

const checkIllegalCharacters = (_: any, value: any, callback: any) => {
  if(typeof(value) !== 'object' && /[<>]/.test(value)){
    return callback(new Error(('can_not_include_illegal_characters')));
  }
  return callback();
}

export interface IRule {
  customRule?: () => string,
  required?: boolean,
  isTriggerByChange?: boolean;
}

const getRules = (rules: Record<string, IRule>) => {
  const result: Record<string, Array<object>> = {};
  Object.keys(rules).forEach((key) => {
    result[key] = [];
    let trigger = 'blur';
    if (rules[key].required) {
      trigger = rules[key].isTriggerByChange ? 'change' : 'blur';
      result[key].push({
        required: true,
        message: computed(() => ('required')),
        trigger,
      })
    }
    if (rules[key].customRule) {
      result[key].push({
        validator: getValidator(rules[key].customRule!),
        trigger,
        'startDate': 0,
      });
    }
  });
  return reactive(result);
};
const getSubmitFunction = (func: () => void) => {
  const submitFunction = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (valid) {
        func();
      }
    });
  };
  return submitFunction;
};
const checkDecimalInput = (inputVal: any) => {
  if (/\./.test(`${inputVal}`)) {
    return ('decimal_point_not_allow');
  }
  return '';
};
const checkNumberInput = (inputVal: any) => {
  if (!/^\d*$/.test(inputVal)) {
    return ('only_number');
  }
  return '';
}
const validateDate = (startDate: string, endDate: string, checkToday = false, today = new Date()) => {
  today.setHours(0, 0, 0, 0);
  const st = new Date(startDate);
  st.setHours(0, 0, 0, 0);
  const en = new Date(endDate);
  en.setHours(0, 0, 0, 0);
  if (st.getTime() > en.getTime()) {
    return ('start_date_must_smaller_than_end_date');
  }
  if (checkToday) {
    if (st.getTime() < today.getTime()) {
      return ('date_cannot_less_than_today')
    }
    return '';
  }
  return '';
};
const checkUserPasswordValidation = (password: string): string =>  {
    if (password.length === 0 ) {
      return '';
    }
    if (password.length < 6 || password.length > 20) {
      return ('your_password_length_must_between_8-15_characters');
    }
    if (!(/^[A-Za-z0-9]+$/.test(password))) {
      return ('password_not_allow_special_character');
    }
    if (!(/[A-Za-z]/.test(password))) {
      return ('password_must_contain_with_letter');
    }
    if (!(/\d/.test(password))) {
      return ('password_must_contain_with_number');
    }
    return '';
};
export default {
  checkDecimalInput,
  checkNumberInput,
  getRules,
  checkUserPasswordValidation,
  getSubmitFunction,
  validateDate,
};
