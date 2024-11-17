import { Tag } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge'; 
import { useLocale, useTranslations } from 'next-intl';
import useAnswersStore from '@/app/_store';
import useStore from '@/app/_store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { gt, lt, lte } from 'lodash';


interface ResultProps {
  model: any
  unit: any
}

const Result: React.FC<ResultProps> = ({
  model,
  unit,
}) => {
  const { answers, datapoints } = useStore()
  const t  = useTranslations();
  const localActive = useLocale();
  console.log(answers)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('interpretation')}</CardTitle>
        <CardDescription>{t('interpretation_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={` p-4 mt-8 rounded-lg ${answers.borderColor}`}>
          <h3 className="font-semibold leading-none tracking-tight" defaultValue="Resultat titel">
            { lt(datapoints.length, 1) ? t('defaultAnswers.title') : answers.title }
          </h3>
          <p className="mt-4 text-sm text-muted-foreground" defaultValue="Tekst forklaring">
          { lt(datapoints.length, 1) ? t('defaultAnswers.text') : answers.text }
          </p>
        </div>
        <div className={`mt-4 rounded-lg p-4 ${answers.borderColor}`}>
          <p className='text-sm text-muted-foreground'>
          { lt(datapoints.length, 1) ? t('defaultAnswers.calculation') : answers.calculation }
            <br />
            <br />
            { lt(datapoints.length, 1) ? t('defaultAnswers.outside') : answers.outside }
          </p>
        </div>
        <CardFooter className='p-0'>
          <div className="flex justify-center flex-wrap mt-4 gap-2">
            <Badge className="flex items-center gap-1 bg-slate-200 text-slate-800">
              <Tag size={12} />
              <span className="text-xs">{t('badges.no_answer')}</span>
            </Badge>
            <Badge className="flex items-center gap-1 bg-orange-200 text-orange-800">
              <Tag size={12} />
              <span className="text-xs">{t('badges.new_test_required')}</span>
            </Badge>
            <Badge className="flex items-center gap-1 bg-red-200 text-red-800">
              <Tag size={12} />
              <span className="text-xs">{t('badges.sign_on_use')}</span>
            </Badge>
            <Badge className="flex items-center gap-1 bg-green-200 text-green-800">
              <Tag size={12} />
              <span className="text-xs">{t('badges.no_new_use')}</span>
            </Badge>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Result;
