import { differenceInDays, differenceInHours } from "date-fns"
import { param } from "./parameters"
import messages from "./locals/local"
import { createTranslator } from "next-intl"
import React, { createContext, useContext, ReactNode } from 'react';
import { useAnswersStore, useDatapointsStore } from "../_store";



// Create the context
const ModelContext = createContext(null);

// Export a custom hook to use the context
export const useModel = () => {
    const context = useContext(ModelContext);
    if (!context) {
        throw new Error('useModel must be used within a ModelComponent');
    }
    return context;
};

const ModelComponent = ({children}) => {

  const {  
    setTitle, 
    setText, 
    setBorderColor, 
    setCalculation,
    setOutside,
    setSpecimenBaseDate,
    setSpecimenLastDate 
  } = useAnswersStore()

  const { datapoints, setDatapoints } = useDatapointsStore() 

  // Variables: 
  const borderColors = {
    normalBorder: 'border-4 border-slate-500',
    redBorder: 'border-red-500 border-4',
    orangeBorder: 'border-orange-500 border-4',
    greenBorder: 'border-green-500 border-4',
    blackBorder: 'border-black border-4',
  }

  //Variable for the first test
  var specimenBase = 0
  //Variable for the last
  var specimenLast = 0
  let dateBase
  let dateLast
  
  //A variable for the old title true = okay, false = outside parameter
  //DEBUG: rename maybe
  var oldTitle = true

  const convertNgMg2 = ( modelType, unit, locale) => {
    specimenLast = datapoints.length - 1

    dateBase = new Date(datapoints[specimenBase]?.date)?.toLocaleDateString('dk-DK', {year: 'numeric', month: 'long', day: 'numeric'})
    setSpecimenBaseDate(dateBase)
    dateLast = new Date(datapoints[specimenLast]?.date)?.toLocaleDateString('dk-DK', {year: 'numeric', month: 'long', day: 'numeric'})
    setSpecimenLastDate(dateLast)
    daysBetween(dateBase, dateLast, locale)
    setUnit(specimenBase, unit, datapoints, locale)
    setModel(modelType, unit, locale)
  }

  //✅ Works as intended 
  const daysBetween = (dateBase, dateLast, locale) => {
    const t = createTranslator({locale, messages: messages[locale]});
     setOutside('')
    if (differenceInDays(dateLast, dateBase) >= 31){
         setOutside(t('defaultAnswers.outside'))
    }
  }

  //✅ Works as intended 
  const setUnit = (index, unit, datapoints) => {
    if (unit === 'mg/mol') {
      return Math.floor(datapoints[index]?.value * 1000/113.12) 
    } else if (unit === 'mg/dL') {
      return Math.floor(datapoints[index]?.value)
    }
  }

  //✅ Works as intended 
  const setModel = (modelType,  unit, locale) => {
    if (modelType === "cronical"){
      cronical(datapoints, unit, locale);
    }
    else if (modelType === "occational"){
        calcRatioOCC(datapoints, unit, locale); 
    }
  }

  // const updateDatapoints = (datapoints, setDatapoints) => {
    // const _datapoint = datapoints[datapoints.length - 1];
    // setDatapoints([...datapoints.filter((datapoint) => datapoint.id !== _datapoint.id),
    //     {
    //         id: _datapoint.id,
    //         date: _datapoint.date,
    //         value: _datapoint.value,
    //         answertitle: answers.title,
    //         qantity: [...datapoints].find((datapoint) => datapoint.id === _datapoint.id).qantity - 1, 
    //         //If increment + 1 & decrement - 1 
    //     },
    // ])
  // }

  const cronical = (datapoints, unit, locale) => {
    const convertSpecimenBase = setUnit(specimenBase, unit, datapoints)
    if (datapoints.length === 1 || specimenLast === specimenBase){
        above800(convertSpecimenBase, locale) 
    } else {
      const convertSpecimeLast = setUnit(specimenLast, unit, datapoints)
      const totalHours = differenceInHours(datapoints[specimenLast].date, datapoints[specimenBase].date);
      calcRatio(convertSpecimeLast, convertSpecimenBase, totalHours, locale)
    }
  }

  //✅ Works as intended 
  const above800 = (convertSpecimenBase, locale) => {
    const t = createTranslator({locale, messages: messages[locale]});
    if (convertSpecimenBase <= param.concentration[1]){
        setTitle(t("case3.title"))
        setText(t("case3.text"))
        setCalculation(t("case3.calculation", {testNumber: specimenBase + 1}))
        specimenBase = specimenBase + 1
        setBorderColor(borderColors.blackBorder)
        oldTitle = true
    }
    else if (convertSpecimenBase > param.concentration[9]){
        setTitle(t("case4.title"))
        setText(t("case4.text", {date: dateBase}))
        setCalculation(t("case4.calculation", {testNumber: specimenBase + 1}))
        specimenBase = specimenBase + 1
        setBorderColor(borderColors.blackBorder)
        oldTitle = true
    } else {
        if (convertSpecimenBase > 800) {
            setTitle(t("case1.title"))
            setText(t("case1.text"))
            setBorderColor(borderColors.normalBorder)
            setCalculation(t("case1.calculation", {testNumber: specimenBase + 1}))
            oldTitle = true
        } else {
            setTitle(t("case2.title"))
            setText(t("case2.text"))
            setBorderColor(borderColors.normalBorder)
            setCalculation(t("case2.calculation", {testNumber: specimenBase + 1}))
            oldTitle = true
        }
    }
  }

  //✅ Works as intended 
  const calcRatio = (convertSpecimeLast, convertSpecimenBase, totalHours, locale) => {
    const ratio = convertSpecimeLast / convertSpecimenBase; 
    const roundedRatio = Math.floor(ratio * 100 ) / 100 

    findA(roundedRatio, totalHours, convertSpecimenBase, convertSpecimeLast, locale); 
  }

  //✅ Works as intended 
  const findA = (roundedRatio, totalHours, convertSpecimenBase, convertSpecimeLast, locale) => {
    const t = createTranslator({locale, messages: messages[locale]});
    let index = 1
    const lastIndex = param.concentration.length - 1

    for (index; index < lastIndex; index++) {
      if (convertSpecimenBase <= param.concentration[1]) {
        setTitle(t("case3.title"))
        setText(t("case3.text"))
        setBorderColor(borderColors.blackBorder)
        setCalculation(t("case3.calculation"))
        specimenBase = specimenLast;
        oldTitle = true;
        return
      } else if (
        convertSpecimenBase > param.concentration[index] &&
        convertSpecimenBase < param.concentration[index + 1]
      ) {
        upperLimit(
          param.A[index],
          param.k[index],
          totalHours,
          param.S2[index],
          param.RMS[index],
          roundedRatio,
          convertSpecimenBase,
          convertSpecimeLast,
          locale
        );
        return
      }
    }

      if (convertSpecimenBase > param.concentration[lastIndex]) {
        setTitle(t("case4.title"))
        setText(t("case4.text"))
        setBorderColor(borderColors.blackBorder)
        setCalculation(t("case4.calculation"))
        specimenBase = specimenLast;
        oldTitle = true;
      }
    }

  //✅ Works as intended 
  const upperLimit = (A, k, t, S2, RMS, ratio, convertSpecimenBase, convertSpecimeLast, locale) => { 
    const result = (A * Math.exp(-k * t)) + (2.57*(Math.sqrt(S2+RMS))); 
    autoInterpretation(result, ratio, convertSpecimenBase, convertSpecimeLast, locale);
  }

  //✅ Works as intended 
  const autoInterpretation = (result, ratio, convertSpecimenBase, convertSpecimeLast, locale) => {
    const t = createTranslator({locale, messages: messages[locale]});

    if (convertSpecimeLast <= param.concentration[1]){
        setTitle(t("case5.title"))
        setText(t("case5.text"))
        setCalculation(t("case5.calculation", {testNumber: specimenBase + 1}))
        setBorderColor(borderColors.blackBorder)
        specimenBase = specimenLast
    }
    else if (convertSpecimeLast > param.concentration[9]){
        setTitle(t("case4.title"))
        setText( t("case4.text"))
        setCalculation(t("case4.calculation"))
        setBorderColor(borderColors.blackBorder)
        specimenBase = specimenLast
    }
    else {
        if (result < ratio) {
            setBorderColor(borderColors.redBorder)
            setCalculation(t("case6.calculation", {testNumber1: specimenBase + 1, testNumber2: specimenLast +1}))
            if (convertSpecimenBase >= 800) {
                if(convertSpecimeLast < 200){
                    setTitle(t("case6_1.title"))
                    setText(t("case6_1.text", {date: dateLast}))
                }
                else if (specimenLast - specimenBase >= 1 && oldTitle === false)
                {
                    setTitle(t("case6_2.title"))
                    setText(t("case6.case6_2.text", {date: dateLast}))
                }
                else{
                    setTitle(t("case6_3.title"))
                    setText(t("case6_3.text", {date: dateBase, nextDate: new Date(datapoints[specimenBase].date).addDays(15).toLocaleDateString('dk-DK', { year: 'numeric', month: 'long', day: 'numeric' })}))
                    setBorderColor(borderColors.orangeBorder)
                }
            }
            else if (convertSpecimenBase < 800) {
                if (specimenLast > 1 && oldTitle === false){
                    setTitle(t("case6_4_1.title"))
                    setText(t("case6_4_1.text", {date: dateLast}))
                    setBorderColor(borderColors.redBorder)
                } else {
                    setTitle(t("case6_4_2.title"))
                    setText(t("case6_4_2.text", {date: dateLast}))
                    setBorderColor(borderColors.orangeBorder)
                }
            }
            specimenBase = specimenLast
        } 
        else if (result > ratio) {
            setTitle(t("case6_5.title"))
            setText(t("case6_5.text", {date1: dateBase, date2: dateLast}))
            setCalculation(t("case6_5.calculation", {testNumber1: specimenBase + 1, testNumber2: specimenLast +1}))
            setBorderColor(borderColors.greenBorder)
        } 
        else if (result = null){
        }
        oldTitle = false
    }
  } 

  const calcRatioOCC = (datapoints, unit, locale ) => {
    const t = createTranslator({locale, messages: messages[locale]});
    const roundedSpecimenBase = setUnit(specimenBase, unit, datapoints)
    const roundedSpecimenLast = setUnit(specimenLast, unit, datapoints)


    if (datapoints.length === 1){
        setTitle(t("case7.title"))
        setText(t("case7.text", {date: dateBase}))
        setCalculation(t("case7.calculation"))
        setBorderColor(borderColors.normalBorder)
    } else {
        const totalHours = differenceInHours(datapoints[specimenLast].date, datapoints[specimenBase].date);
        const ratio = roundedSpecimenLast / roundedSpecimenBase;
        const roundedRatio = Math.floor(ratio * 100) / 100 
        calculateOCC(totalHours, roundedRatio, locale); 
    }
  }

  const calculateOCC = (totalHours, roundedRatio, locale) => {
    const t = createTranslator({locale, messages: messages[locale]});

    const lastIndex = param.time.length - 1

    if (totalHours <= param.time[1]) {
      setTitle(t("case10.title"))
      setText(t("case10.text"))
      setCalculation(t("case10.calculation", {date1: dateBase, date2: dateLast }))
      setBorderColor(borderColors.blackBorder)
      specimenBase = specimenLast
      oldTitle = true
      return
    }

    for (let i = 1; i < lastIndex; i++) {
      if (totalHours > param.time[i] && totalHours <= param.time[i + 1]) {
        result(param.max[i], roundedRatio, locale)
        return
      }
    }

    if (totalHours > param.time[lastIndex]) {
      setTitle(t("case11.title"))
      setText(t("case11.text"))
      setCalculation(t("case11.calculation", {date1: dateBase, date2: dateLast }))
      setBorderColor(borderColors.blackBorder)
      specimenBase = specimenLast
      oldTitle = true
    }
  }

  const result = (max, ratio, locale) => {
    const t = createTranslator({locale, messages: messages[locale]});

    if (ratio > max){
        setTitle(t("case9.title"))
        setText(t("case9.text", {date1: dateBase, date2: dateLast }))
        setCalculation(t("case9.calculation", {testNumber1: specimenBase + 1, testNumber2: specimenLast +1}))
        setBorderColor(borderColors.redBorder)
        
        specimenBase = specimenLast

    } else {
        setTitle(t("case8.title"))
        setText(t("case8.text", {date1: dateBase, date2: dateLast }))
        setCalculation(t("case8.calculation", {testNumber1: specimenBase + 1, testNumber2: specimenLast +1}))
        setBorderColor(borderColors.greenBorder)
        
        specimenBase = specimenLast
    }
  }

  return (
    <ModelContext.Provider value={{ convertNgMg2 }}>
      {children}
    </ModelContext.Provider>
  )
}

export default ModelComponent
