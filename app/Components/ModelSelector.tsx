import React from 'react'
import useModelStore from '../_store/modelStore'
import { ModelType } from '../_store/types';
import { useTranslations } from 'next-intl';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const ModelSelector = () => {
  const t = useTranslations(); 
  const {model, setModel} = useModelStore()

  const displayTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.value as ModelType
    if (window.confirm(t('changingModel', { target }))) {
      setModel(target)
      setTimeout(() => {
        window.location.reload()
      }, 500)              

    }
  };

  const handleChange = (e: any) => {
    if (window.confirm(t('changingModel', {target: e }))) {
      setModel(e)
      setTimeout(() => {
        window.location.reload()
      }, 500)              

    }
    }


  return (
    <div>
      <div className=" sm:inline-flex hidden rounded-lg text-muted-foreground bg-muted p-1">
        <button
          key={"tab"}
          value="cronical" 
          onClick={displayTag}
          className={`px-4 py-2 font-medium transition-colors duration-150 ease-in-out focus:outline-none rounded-md ${
            model === "cronical"
              ? 'bg-white text-slate-900 '
              : 'text-slate-500 hover:text-slate-900 '
          }`}
        >
          {t('chronical_use')}
        </button>
        <button
          key={"tab"}
          value="occational"  
          onClick={displayTag}
          className={`px-4 py-2 font-medium transition-colors duration-150 ease-in-out focus:outline-none rounded-md ${
            model === "occational"
            ? 'bg-white text-slate-900 '
            : 'text-slate-500 hover:text-slate-900 '
          }`}
        >
          {t('occational_use')}
        </button>
      </div>
      <div className='sm:hidden block'>
        <Select
          onValueChange={(e)=> handleChange(e)}
          defaultValue={"cronical"}
          value={model} 
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder={t('change_model')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t('change_model')}</SelectLabel>
              <SelectItem value="cronical">{t('chronical_use')}</SelectItem>
              <SelectItem value="occational">{t('occational_use')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ModelSelector