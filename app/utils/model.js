'use client'
import { createTranslator } from 'next-intl';
import React, { createContext, useContext, useState } from 'react'
import { useAnswersStore, useDatapointsStore, useUtilitiesStore } from '../_store';
import { param } from './parameters';
import messages from './locals/local';
import {addDays, differenceInDays, differenceInHours } from 'date-fns';

const ModelContext = createContext(null);

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
      throw new Error('useModel must be used within a ModelComponent');
  }
  return context;
};

const borderColors = {
  normalBorder: 'border-4 border-slate-500',
  redBorder: 'border-red-500 border-4',
  orangeBorder: 'border-orange-500 border-4',
  greenBorder: 'border-green-500 border-4',
  blackBorder: 'border-black border-4',
}

const Model = ({children}) => {
  const {  
    setTitle, 
    setText, 
    setBorderColor, 
    setCalculation,
    setOutside,
    setBaseDate,
    setLastDate,
    setSpecimenBase,
    setSpecimenLast, 
  } = useAnswersStore()
  const {lang, unit, model} = useUtilitiesStore()
  const t = createTranslator({lang, messages: messages[lang]});


  const call = () => {
    const {datapoints} = useDatapointsStore.getState()
    const {answers} = useAnswersStore.getState()
    console.log("call exce")
    daysBetween()
    setSpecimenLast(datapoints?.length - 1)
    setBaseDate(new Date(datapoints[answers?.specimenBase]?.date)?.toLocaleDateString('dk-DK', {year: 'numeric', month: 'long', day: 'numeric'}))
    setLastDate(new Date(datapoints[answers?.specimenLast]?.date)?.toLocaleDateString('dk-DK', {year: 'numeric', month: 'long', day: 'numeric'})
  )

    console.log(answers.baseDate)
    setModel()
  }

  const daysBetween = () => {
    const {answers} = useAnswersStore.getState()
     setOutside('')
    if (differenceInDays(answers.lastDate, answers.baseDate) >= 31){
         setOutside(t('defaultAnswers.outside'))
    }
  }

  const setUnit = (index) => {
    const {datapoints} = useDatapointsStore.getState()
    if (unit === 'mg/mol') {
      return Math.floor(datapoints[index]?.value * 1000/113.12) 
    } else if (unit === 'mg/dL') {
      return Math.floor(datapoints[index]?.value)
    }
}

const setModel = () => {
  if (model === "cronical"){
    cronical(unit);
  }
  else if (model === "occational"){
    calcRatioOCC(unit); 
  }
}

  const cronical = (unit) => {
    const {answers} = useAnswersStore.getState()
    const {datapoints} = useDatapointsStore.getState()
    const convertSpecimenBase = setUnit(answers.specimenBase)
    const convertSpecimeLast = setUnit(answers.specimenLast)
    if (datapoints.length === 1 || answers.specimenLast === answers.specimenBase){
        above800(convertSpecimenBase) 
    } else {
      findA(convertSpecimenBase, convertSpecimeLast); 
    }
  }

  const above800 = (convertSpecimenBase) => {
    const {answers} = useAnswersStore.getState()

    if (convertSpecimenBase <= param.concentration[1]){
        setTitle(t("case3.title"))
        setText(t("case3.text"))
        setCalculation(t("case3.calculation", {testNumber: answers.specimenBase + 1}))
        setBorderColor(borderColors.blackBorder)
        setSpecimenBase((prev) => prev + 1)
    }
    else if (convertSpecimenBase > param.concentration[9]){
        setTitle(t("case4.title"))
        setText(t("case4.text", {date: answers.specimenBase}))
        setCalculation(t("case4.calculation", {testNumber: answers.specimenBase + 1}))
        setBorderColor(borderColors.blackBorder)
        setSpecimenBase((prev) => prev + 1)
    } else {
        if (convertSpecimenBase > 800) {
            setTitle(t("case1.title"))
            setText(t("case1.text"))
            setBorderColor(borderColors.normalBorder)
            setCalculation(t("case1.calculation", {testNumber: answers.specimenBase + 1}))
        } else {
            setTitle(t("case2.title"))
            setText(t("case2.text"))
            setBorderColor(borderColors.normalBorder)
            setCalculation(t("case2.calculation", {testNumber: answers.specimenBase + 1}))
        }
    }
  }

  const findA = () => {
    const {answers} = useAnswersStore.getState()
    const convertSpecimenBase = setUnit(answers.specimenBase)
    let index = 1
    const lastIndex = param.concentration.length - 1
    for (index; index < lastIndex; index++) {
      if (convertSpecimenBase <= param.concentration[1]) {
        setTitle(t("case3.title"))
        setText(t("case3.text"))
        setBorderColor(borderColors.blackBorder)
        setCalculation(t("case3.calculation"))
        setSpecimenBase(answers.specimenLast)
        return
      } else if (
        convertSpecimenBase > param.concentration[index] &&
        convertSpecimenBase < param.concentration[index + 1]
      ) {
        autoInterpretation(index );
        return
      }
    }

      if (convertSpecimenBase > param.concentration[lastIndex]) {
        setTitle(t("case4.title"))
        setText(t("case4.text"))
        setBorderColor(borderColors.blackBorder)
        setCalculation(t("case4.calculation"))
        setSpecimenBase(useAnswersStore.getState().answers.specimenLast)
      }
  }

  const getUpperLimit = (index) => { 
    const {datapoints} = useDatapointsStore.getState()
    const {answers} = useAnswersStore.getState()
    const totalHours = differenceInHours(datapoints[answers.specimenLast].date, datapoints[answers.specimenBase].date);
    return (param.A[index] * Math.exp(-param.k[index] * totalHours)) + (2.57*(Math.sqrt(param.S2[index]+param.RMS[index])));
  }

  const autoInterpretation = (index ) => {
    const {answers} = useAnswersStore.getState()
    const {datapoints} = useDatapointsStore.getState()
    const convertSpecimenBase = setUnit(answers.specimenBase)
    const convertSpecimeLast = setUnit(answers.specimenLast)
    console.log(answers.specimenLast)

    const ratio = convertSpecimeLast / convertSpecimenBase; 
    const result = getUpperLimit(index)
    console.log(result)
    console.log(convertSpecimeLast)
    console.log(convertSpecimenBase)
    console.log(ratio)

    if (convertSpecimeLast <= param.concentration[1]){
        console.log("first")
        setTitle(t("case5.title"))
        setText(t("case5.text"))
        setCalculation(t("case5.calculation", {testNumber: answers.specimenBase + 1}))
        setBorderColor(borderColors.blackBorder)
        setSpecimenBase(answers.specimenLast)
    }
    else if (convertSpecimeLast > param.concentration[9]){
        console.log("second")
        setTitle(t("case4.title"))
        setText( t("case4.text"))
        setCalculation(t("case4.calculation"))
        setBorderColor(borderColors.blackBorder)
        setSpecimenBase(answers.specimenLast)
    }
    else {
        if (result < ratio) {
          console.log("third")
            setBorderColor(borderColors.redBorder)
            setCalculation(t("case6.calculation", {testNumber1: answers.specimenBase + 1, testNumber2: answers.specimenLast +1}))
            if (convertSpecimenBase >= 800) {
              console.log("3.1")
                if(convertSpecimeLast < 200){
                    setTitle(t("sign_of_new_use.title"))
                    setText(t("sign_of_new_use.text", {date: answers.lastDate}))
                }
                else if (answers.specimenLast - answers.specimenBase >= 1)
                {
                  console.log("3.2")
                    setTitle(t("sign_of_new_use.title"))
                    setText(t("sign_of_new_use.text", {date: answers.lastDate}))
                }
                else{
                  console.log("3.3")
                    setTitle(t("case6_3.title"))
                    setText(t("case6_3.text", {date: answers.baseDate, nextDate: addDays(new Date(datapoints[answers.specimenBase].date), 15).toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric' })}))
                    setBorderColor(borderColors.orangeBorder)
                }
            }
            else if (convertSpecimenBase < 800) {
              console.log("4")
                if (answers.specimenLast > 1){
                  console.log("4.1")
                    setTitle(t("sign_of_new_use.title"))
                    setText(t("sign_of_new_use.text", {date: answers.lastDate}))
                    setBorderColor(borderColors.redBorder)
                } else {
                  console.log("4.2")
                    setTitle(t("case6_4_2.title"))
                    setText(t("case6_4_2.text", {date: answers.lastDate}))
                    setBorderColor(borderColors.orangeBorder)
                }
            }
            setSpecimenBase(answers.specimenLast)
        } 
        else if (result > ratio) {
          console.log("5")
            setTitle(t("case6_5.title"))
            setText(t("case6_5.text", {date1: answers.specimenBase, date2: answers.lastDate}))
            setCalculation(t("case6_5.calculation", {testNumber1: answers.specimenBase + 1, testNumber2: answers.specimenLast +1}))
            setBorderColor(borderColors.greenBorder)
        } 
    }
  } 

  return (
    <ModelContext.Provider value={{ call }}>
      {children}
    </ModelContext.Provider>
  )
}

export default Model
