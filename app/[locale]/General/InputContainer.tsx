import { useTranslations } from 'next-intl';
import React from 'react';
import Input from './Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ResultTable from './ResultTable';

interface InputContainerProps {
  answers?: any;
  model: string;
  setUnit: (unit: any) => void;
  unit: string
}

const InputContainer: React.FC<InputContainerProps> = ({ answers, model, setUnit, unit }) => {
  const t  = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('enter_values')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
          setUnit={setUnit}
          model={model}
          unit={unit}
        />
      </CardContent>
      <CardFooter>
        <ResultTable model={model} />
      </CardFooter>
    </Card>
  );
};

export default InputContainer;
