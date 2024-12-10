'use client'
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Info, Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useLocale, useTranslations } from 'next-intl';
import { Input as InputField } from '@/components/ui/input';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { type Locale, enUS, da } from 'date-fns/locale';
// import { convertNgMg2 } from '@/app/utils/model2';
import { useForm, Controller } from 'react-hook-form';
import { useAnswersStore, useDatapointsStore, useUtilitiesStore } from '@/app/_store';
import { addDays, differenceInDays, differenceInHours, isAfter, isBefore } from 'date-fns';
import { useModel } from '@/app/utils/model2';

interface InputProps {
  setUnit: (unit: string) => void;
  model: string;
  unit: string;
}


function Input({ setUnit, model, unit }: InputProps) {
  const { convertNgMg2 } = useModel();
  const t = useTranslations()
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      date: '', //undefined as Date | undefined,
      value: '' // undefined as number | undefined,
    },
  });
  const {datapoints, setDatapoints} = useDatapointsStore()
  const {answers} = useAnswersStore()
  const {
    toggleModal,
    setWarning,
    setOpenWarning
  } = useUtilitiesStore()
  const localActive = useLocale();
  const [lastDate, setDateLast] = useState<Date | null>(null);
  const date = watch('date')
  const value = watch('value')

  useEffect(() => {
    if (datapoints.length > 0) {
      setDateLast(new Date(datapoints[datapoints.length - 1].date))
      //@ts-ignore
      convertNgMg2( model, unit, localActive)
    }
  }, [datapoints]);

  function isMoreThan30DaysAway(date: Date | string, currentDate: Date | null) {
    if (!currentDate) return
    //@ts-ignore
    const thirtyDaysFromNow = addDays(currentDate, 30);
    return isAfter(date, thirtyDaysFromNow)
  }

  

  useEffect(() => {
    if (!lastDate || isBefore(date, lastDate)) return
    if (model === "cronical") {
      if (differenceInHours(date, lastDate) < 48 ) {
        setOpenWarning(true)
        setWarning(
          <>
            {t.rich('less_than_two_days_warning', {
              strong: (children) => <strong>{children}</strong>,
            })}
            <br />
            {t('violates_the_model')}
          </>
        );
      } else {
        setOpenWarning(false)
      }
    } else if (model === "occational" && lastDate) {
        if (differenceInHours(date, lastDate) > 120 ) {
          setOpenWarning(true)
          setWarning(
            <>
            {t.rich('less_than_two_days_warning_occational', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </>
          )
        } else {
          setOpenWarning(false)
        }
    }
    
  },[date])
  
  const onSubmit = () => {
    if (!date || !value) return;

    if (differenceInDays(answers.specimenLastDate, answers.specimenBaseDate) >= 31){
      return toggleModal(true)
    }
  
    // @ts-ignore
    if (datapoints.length === 0 || isBefore(lastDate, date) ) {
      const newDatapoint = {
        id: uuidv4(),
        value: Number(value),
        date: date,
        answerTitle: 'Example Title',
        answerBorder: 'normalBorder',
      };
      // @ts-ignore
      setDatapoints([...datapoints, newDatapoint])
      setOpenWarning(false)
      reset()
      const formattedDate = model === "cronical" ?  new Date(date).toLocaleDateString(localActive, { year: 'numeric', month: 'long', day: 'numeric' }) :  new Date(date).toLocaleDateString(localActive, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
      toast.success(t('toast.result_added'), {
        description: `${(t('test_value'))}: ${value} - ${(t('common.test_date'))} ${formattedDate}`
      })
    } else {
      toast.warning(t('toast.error_date'))
    }
  };
  
  function buttonHandlerDelete() {
    window.location.reload();
  }

  

  return (
    <div className="w-full flex justify-center items-center flex-col relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center flex-col items-center mt-4 flex-wrap relative">
          <div className="flex justify-between text-center items-center rounded-lg p-2 gap-4 border border-slate-200">
            <p className="w-8 h-8 bg-muted rounded-lg text-center flex justify-center items-center" id="testnumber">
              {datapoints.length + 1}
            </p>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                // @ts-ignore
                <DateTimePicker 
                  granularity={model === 'occational' ? 'minute' : 'day'} 
                  {...field}
                  className="w-[280px]" 
                  locale={localActive === "da" ? da : enUS }
                  placeholder={t('pick_a_date')}
                />
              )}
            />

            <div className="flex gap-[1px]">
              <Controller
                control={control}
                name="value"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    placeholder={t('test_value')}
                    className='rounded-r-none'
                  />
                )}
              />

              <Select
                onValueChange={(e: string) => setUnit(e)}
                defaultValue="mg/mol"
              >
                <SelectTrigger className="w-[120px] rounded-l-none">
                  <SelectValue placeholder={t('change_unit')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t('change_unit')}</SelectLabel>
                    <SelectItem value="mg/mol">mg/mol</SelectItem>
                    <SelectItem value="mg/dL">mg/dL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button variant={'default'} type="submit" disabled={(!date || !value) }>
              <Plus />
              {t('common.add_result')}
            </Button>
          </div>

          <Button type="button" variant={'destructive'} className='mt-4' onClick={buttonHandlerDelete}>
            <Trash />
            {t('common.delete_results')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Input;
