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
import { useForm, Controller } from 'react-hook-form';
import { useAnswersStore, useDatapointsStore, useUtilitiesStore } from '@/app/_store';
import { addDays, differenceInDays, differenceInHours, isAfter, isBefore } from 'date-fns';
import { useModel } from '@/app/utils/model';
import { UnitType } from '@/app/_store/types';
import { isEmpty } from 'lodash';
import useModelStore from '@/app/_store/modelStore';

function Input() {
  const {call} = useModel()
  const t = useTranslations()
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      date: '', //undefined as Date | undefined,
      value: '' // undefined as number | undefined,
    },
  });
  const {datapoints, setDatapoints} = useDatapointsStore()
  const {
    toggleModal,
    setWarning,
    setOpenWarning,
    unit, 
    setUnit
  } = useUtilitiesStore()
  const {model} = useModelStore()
  const localActive = useLocale();
  const [lastDate, setDateLast] = useState<Date | null>(null);
  const date = watch('date')
  const value = watch('value')
  

  useEffect(() => {
    const {datapoints} = useDatapointsStore.getState()
    //@ts-ignore
    if (isEmpty(datapoints) || isBefore(date, datapoints[datapoints.length - 1]?.date)) return
    if (model === "cronical") {
      //@ts-ignore
      if (differenceInHours(date, datapoints[datapoints.length - 1]?.date) < 48 ) {
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
    } else if (model === "occational" && datapoints[datapoints.length - 1]?.date) {
        //@ts-ignore
        if (differenceInHours(date, datapoints[datapoints.length - 1].date) > 120 ) {
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
    const {datapoints } = useDatapointsStore.getState()

    // @ts-ignore
    if (differenceInDays(date, useAnswersStore.getState().answers.baseDate) >= 31) {
      return toggleModal();
    }

    // @ts-ignore
    if (datapoints.length === 0 || isBefore(datapoints[datapoints.length - 1]?.date, date)) {
      const newDatapoint = {
        id: uuidv4(),
        value: Number(value),
        date: date,
        answerTitle: 'Example Title',
        answerBorder: 'normalBorder',
      };
  
      // @ts-ignore
      setDatapoints([...datapoints, newDatapoint]);
      // @ts-ignore
      call(model, unit); // Trigger the model call
      setOpenWarning(false);
      reset();
  
      const formattedDate =
        model === 'cronical'
          ? new Date(date).toLocaleDateString(localActive, { year: 'numeric', month: 'long', day: 'numeric' })
          : new Date(date).toLocaleDateString(localActive, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: false,
            });
  
      toast.success(t('toast.result_added'), {
        description: `${t('test_value')}: ${value} - ${t('common.test_date')} ${formattedDate}`,
      });
    } else {
      toast.warning(t('toast.error_date'));
    }
  };
  
  
  
  function buttonHandlerDelete() {
    window.location.reload();
  }

  

  return (
    <div className="w-full flex justify-center items-center flex-col relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row sm:flex-col justify-center items-center mt-4 flex-wrap relative">
          <div className="flex flex-col sm:flex-row justify-between text-center items-start sm:flex-start rounded-lg p-2 gap-4 border border-slate-200">
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
                onValueChange={(e: UnitType) => setUnit(e)}
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
            <Button className='w-full sm:w-auto' variant={'default'} type="submit" disabled={(!date || !value) }>
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
