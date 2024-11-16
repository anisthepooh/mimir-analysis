import { Tag } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge'; 
import { useLocale, useTranslations } from 'next-intl';
import useAnswersStore from '@/app/_store';
import useStore from '@/app/_store';


interface ResultProps {
  model: any
  unit: any
}

const Result: React.FC<ResultProps> = ({
  model,
  unit,
}) => {
  const { answers } = useStore()
  const t  = useTranslations();
  const localActive = useLocale();
  console.log(answers)

  return (
    <div>
      <div className={` p-4 mt-8 rounded-lg ${answers.borderColor}`}>
        <h3 className="text-xl text-center font-semibold" defaultValue="Resultat titel">
          {answers.title}
        </h3>
        <p className="mt-4" defaultValue="Tekst forklaring">
          {answers.text}
        </p>
      </div>
      <div className={`mt-4 rounded-lg p-4 ${answers.borderColor}`}>
        <p>
          {answers.calculation}
          <br />
          <br />
          {answers.outside}
        </p>
      </div>
      <div className="flex justify-center mt-4 gap-2">
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
    </div>
  );
};

export default Result;
