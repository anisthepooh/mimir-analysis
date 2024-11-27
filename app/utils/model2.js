import { differenceInDays, differenceInHours } from "date-fns"
import { param } from "./Parameters"
import messages from "./locals/local"
import { createTranslator } from "next-intl"

// Variables: 
const borderColors = {
  normalBorder: 'border-4 border-slate-500',
  redBorder: 'border-red-500 border-4',
  orangeBorder: 'border-orange-500 border-4',
  greenBorder: 'border-green-500 border-4',
  blackBorder: 'border-black border-4',
}

export var answers = {
  title: '',
  text: '',
  borderColor: '',
  calculation: '',
  outside: ''
}

//Variable for the first test
var specimenBase = 0
//Variable for the last
var specimenLast = 0
const convertSpecimenLast = null
const roundedSpecimenLast = null
const lastDate = null
var totalHours = null
let dateBase
let dateLast
 
//A variable for the old title true = okay, false = outside parameter
//DEBUG: rename maybe
var oldTitle = true

export const convertNgMg2 = (datapoints, setDatapoints, modelType, unit, locale) => {
  specimenLast = datapoints.length - 1

  //DEBUG: Check if you can delete the two first
  // const dateBase = new Date(datapoints[specimenBase].date)
  // const dateLast = new Date(datapoints[specimenLast].date)
  dateBase = new Date(datapoints[specimenBase]?.date)?.toLocaleDateString('dk-DK', {year: 'numeric', month: 'long', day: 'numeric'})
  dateLast = new Date(datapoints[specimenLast]?.date)?.toLocaleDateString('dk-DK', {year: 'numeric', month: 'long', day: 'numeric'})


  daysBetween(dateBase, dateLast, locale)
  setUnit(specimenBase, unit, datapoints, locale)
  setModel(modelType, datapoints, setDatapoints, unit, locale)
  return answers

  //setModel(modelType, datapoints, setDatapoints, unit)
}

//✅ Works as intended 
const daysBetween = (dateBase, dateLast, locale) => {
  const t = createTranslator({locale, messages: messages[locale]});
  console.log( t("case.text"))
  answers.outside = '';
  if (differenceInDays(dateLast, dateBase) >= 31){
      answers.outside = t('defaultAnswers.outside')
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
const setModel = (modelType, datapoints, setDatapoints, unit, locale) => {
  if (modelType === "cronical"){
    cronical(datapoints, unit, locale);
    ///updateDatapoints(datapoints, setDatapoints);
  }
  else if (modelType === "occational"){
      calcRatioOCC(datapoints, unit, locale); 
      //updateDatapoints(datapoints, setDatapoints);
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
  console.log("above800", t('case3.title'))
  if (convertSpecimenBase <= param.concentration[1]){
      answers.title = t("case3.title")
      answers.text = t("case3.text")
      answers.calculation = t("case3.calculation", {testNumber: specimenBase + 1})
      specimenBase = specimenBase + 1
      answers.borderColor = borderColors.blackBorder
      oldTitle = true
  }
  else if (convertSpecimenBase > param.concentration[9]){
      answers.title = t("case4.title")
      answers.text = t("case4.text", {date: dateBase})
      answers.calculation = t("case4.calculation", {testNumber: specimenBase + 1})
      specimenBase = specimenBase + 1
      answers.borderColor = borderColors.blackBorder
      oldTitle = true
  } else {
      if (convertSpecimenBase > 800) {
          answers.title = t("case1.title")
          answers.text = t("case1.text")
          answers.borderColor = borderColors.normalBorder
          answers.calculation = t("case1.calculation", {testNumber: specimenBase + 1})
          oldTitle = true
      } else {
          answers.title = t("case2.title")
          answers.text = t("case2.text")
          answers.borderColor = borderColors.normalBorder
          answers.calculation = t("case2.calculation", {testNumber: specimenBase + 1})
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
  console.log("findA", t('case3.title'))
  let index = 1
  const lastIndex = param.concentration.length - 1

  for (index; index < lastIndex; index++) {
    if (convertSpecimenBase <= param.concentration[1]) {
      answers.title = t("case3.title")
      answers.text = t("case3.text")
      answers.borderColor = borderColors.blackBorder;
      answers.calculation = t("case3.calculation")
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
      answers.title = t("case4.title")
      answers.text = t("case4.text")
      answers.borderColor = borderColors.blackBorder;
      answers.calculation = t("case4.calculation")
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
  console.log("autoInterpretation", t("case5.title"))

  if (convertSpecimeLast <= param.concentration[1]){
      answers.title = t("case5.title")
      answers.text = t("case5.text")
      answers.calculation = t("case5.calculation", {testNumber: specimenBase + 1})
      answers.borderColor = borderColors.blackBorder
      specimenBase = specimenLast
  }
  else if (convertSpecimeLast > param.concentration[9]){
      answers.title = t("case4.title")
      answers.text =  t("case4.text")
      answers.calculation = t("case4.calculation")
      answers.borderColor = borderColors.blackBorder
      specimenBase = specimenLast
  }
  else {
      if (result < ratio) {
          answers.borderColor = borderColors.redBorder
          answers.calculation = t("case6.calculation", {testNumber1: specimenBase + 1, testNumber2: specimenLast +1})
          if (convertSpecimenBase >= 800) {
              if(convertSpecimeLast < 200){
                  answers.title = t("case6_1.title")
                  answers.text = t("case6_1.text", {date: dateLast})
              }
              else if (specimenLast - specimenBase >= 1 && oldTitle === false)
              {
                  answers.title = t("case6_2.title")
                  answers.text = t("case6.case6_2.text", {date: dateLast})
              }
              else{
                  answers.title = t("case6_3.title")
                  answers.text = t("case6_3.text", {date: dateBase, nextDate: new Date(datapoints[specimenBase].date).addDays(15).toLocaleDateString('dk-DK', { year: 'numeric', month: 'long', day: 'numeric' })})
                  answers.borderColor = borderColors.orangeBorder
              }
          }
          else if (convertSpecimenBase < 800) {
              if (specimenLast > 1 && oldTitle === false){
                  answers.title = t("case6_4_1.title")
                  answers.text = t("case6_4_1.text", {date: dateLast})
                  answers.borderColor = borderColors.redBorder
              } else {
                  answers.title = t("case6_4_2.title")
                  answers.text = t("case6_4_2.text", {date: dateLast})
                  answers.borderColor = borderColors.orangeBorder
              }
          }
          specimenBase = specimenLast
      } 
      else if (result > ratio) {
          answers.title = t("case6_5.title")
          answers.text = t("case6_5.text", {date1: dateBase, date2: dateLast})
          answers.calculation = t("case6_5.calculation ", {testNumber1: specimenBase + 1, testNumber2: specimenLast +1})
          answers.borderColor = borderColors.greenBorder
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
      answers.title = t("case7.title")
      answers.text = t("case7.text", {date: dateBase})
      answers.calculation = t("case7.calculation")
      answers.borderColor = borderColors.normalBorder
  } else {
      const totalHours = differenceInHours(datapoints[specimenLast].date, datapoints[specimenBase].date);
      const ratio = roundedSpecimenLast / roundedSpecimenBase;
      const roundedRatio = Math.floor(ratio * 100) / 100 
      calculateOCC(totalHours, roundedRatio, locale); 
  }
}

const calculateOCC = (totalHours, roundedRatio, locale) => {
  const lastIndex = param.time.length - 1

  if (totalHours <= param.time[1]) {
    answers.title = t("case10.title")
    answers.text = t("case10.text")
    answers.calculation = t("case10.calculation", {date1: dateBase, date2: dateLast })
    answers.borderColor = borderColors.blackBorder
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
    answers.title = t("case11.title")
    answers.text = t("case11.text")
    answers.calculation = t("case11.calculation", {date1: dateBase, date2: dateLast })
    answers.borderColor = borderColors.blackBorder
    specimenBase = specimenLast
    oldTitle = true
  }
}

const result = (max, ratio, locale) => {
  const t = createTranslator({locale, messages: messages[locale]});

  if (ratio > max){
      answers.title = t("case9.title")
      answers.text = t("case9.text", {date1: dateBase, date2: dateLast })
      answers.calculation = t("case9.calculation", {testNumber1: specimenBase + 1, testNumber2: specimenLast +1})
      answers.borderColor = borderColors.redBorder
      
      specimenBase = specimenLast

  } else {
      answers.title = t("case8.title")
      answers.text = t("case8.text", {date1: dateBase, date2: dateLast })
      answers.calculation = t("case8.calculation", {testNumber1: specimenBase + 1, testNumber2: specimenLast +1})
      answers.borderColor = borderColors.greenBorder
      
      specimenBase = specimenLast
  }
}





