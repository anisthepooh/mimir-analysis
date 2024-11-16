import { useTranslations } from 'next-intl';
import React from 'react';
import Input from './Input';

interface InputContainerProps {
  answers?: any;
  model: string;
  setUnit: (unit: any) => void;
  unit: string
}

const InputContainer: React.FC<InputContainerProps> = ({ answers, model, setUnit, unit }) => {
  const t  = useTranslations();

  return (
    <div className="w-full px-4">
      <div>
        <h2 className="text-2xl font-semibold text-center">{t('enter_values')}</h2>
        <Input 
          setUnit={setUnit}
          model={model}
          unit={unit}
        />
      </div>
    </div>
  );
};

export default InputContainer;
