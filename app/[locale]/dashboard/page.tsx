'use client'
import Dashboard from "../General/Dashboard";
import InputContainer from "../General/InputContainer";
import { useLocale, useTranslations } from "next-intl";
import Result from "../General/Result";
import ChartResult from "../General/ChartResult";
import Modal from "../../Components/Modal";
import ModelComponent from "@/app/utils/model";
import GradientWrapper from "@/app/Components/GradientWrapper";

export default function Home() {
  const t = useTranslations()

  return (
    <ModelComponent>
      <GradientWrapper>
      <div className=" container px-4 md:px-6 mx-auto">
        <Dashboard
        />
        <InputContainer 
        />
        <div className='grid grid-cols-1 md:grid-cols-2  gap-4 mt-16 w-full '>
          <Result />
          <ChartResult />
        </div>
        <Modal title={t('warning_30_days')} >
          {t('warning_30_days_description')}
          {t('defaultAnswers.outside')}
        </Modal>
      </div>
      </GradientWrapper>
    </ModelComponent>
  );
}
