'use client'
import { useState, useCallback, useEffect } from "react";
import Dashboard from "./General/Dashboard";
import { useLocalStorage } from "@uidotdev/usehooks";
import InputContainer from "./General/InputContainer";
import { useLocale, useTranslations } from "next-intl";
import Result from "./General/Result";
import ChartResult from "./General/ChartResult";

export default function Home() {
  const [model, setModel] = useLocalStorage("model", 'cronical');
  const [unit, setUnit] = useState("mg/mol")
  const t = useTranslations()

  return (
    <div className=" container mx-auto">
      <Dashboard
        model={model}
        setModel={setModel}
        //setDatapoints={setDatapoints}
      />
      <InputContainer 
        model={model}
        setUnit={setUnit}
        unit={unit}
      />
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4 mt-16 w-full '>
        <Result 
          model={model}
          unit={unit}
        />
        <ChartResult />
      </div>
    </div>
  );
}
