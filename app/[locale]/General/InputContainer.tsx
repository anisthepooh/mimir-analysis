import { useTranslations } from 'next-intl';
import React from 'react';
import Input from './Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ResultTable from './ResultTable';
import WarningMessage from '@/app/Components/WarningMessage';

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
          <p className="mt-4 font-normal text-sm text-muted-foreground capitalize" defaultValue="Tekst forklaring">
            <span className='font-semibold normal-case'>
              {t('chosen_model')}
            </span>
            {t(model)}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-fit">
          <WarningMessage/>
        </div>
        <Input 
          setUnit={setUnit}
          model={model}
          unit={unit}
        />
      </CardContent>
      <CardFooter>
        <ResultTable model={model} unit={unit} />
      </CardFooter>
    </Card>
  );
};

export default InputContainer;
