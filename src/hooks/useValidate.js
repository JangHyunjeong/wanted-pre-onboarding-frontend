import { useState } from 'react';

const useValidate = () => {
  const [value, setValue] = useState('');
  const [validateStatus, setValidateStatus] = useState(false);

  const validateValue = ([value, reg]) => {
    setValue(value);

    if (reg.test(value) === true) {
      setValidateStatus(true);
    } else {
      setValidateStatus(false);
    }
  };

  return {
    value,
    setValue,
    validateStatus,
    validateValue,
  };
};

export default useValidate;
