import { useTranslations } from 'next-intl';
import React from 'react';
import Input from './Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ResultTable from './ResultTable';
import WarningMessage from '@/app/Components/WarningMessage';
import { useUtilitiesStore } from '@/app/_store';

interface InputContainerProps {
}

const InputContainer: React.FC<InputContainerProps> = () => {
  const t  = useTranslations();
  const {model, unit, setUnit} = useUtilitiesStore()


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
        <Input/>
      </CardContent>
      <CardFooter>
        <ResultTable model={model} unit={unit} />
      </CardFooter>
    </Card>
  );
};

export default InputContainer;
