import { param } from './Parameters'
import {createTranslator, createFormatter} from 'use-intl/core';
import messages from './locals/local'
import da from './locals/da.json'

//border colours
var normalBorder = 'border-4 border-slate-500'
var redBorder = 'border-red-500 border-4'
var orangeBorder = 'border-orange-500 border-4'
var greenBorder = 'border-green-500 border-4'
var blackBorder = 'border-black border-4'

export const answers = { 
    title: "",
    text: "",
    borderColor: normalBorder,
    calculation: "",
    outside: ''
}


//the number of the current test used for calculations
var specimen_base = 0;
var specimen_last = 0;

//A variable for the old title 0 = okay, 1 = outside parameter
var old_title = 0;
 
//main function
export function convertNgMg({datapoints, setDatapoints}, modelType, unit, locale) {
    const t = createTranslator({locale, messages: da});
    console.log(datapoints)

    //Sets the variable equal to the length of the list minus 1. 
    specimen_last = datapoints.length - 1

    //creates variables to use in the results
    var date_base = new Date(datapoints[specimen_base].date)
    var date_last = new Date(datapoints[specimen_last].date)
    var date_base_format = new Date(datapoints[specimen_base].date).toLocaleDateString('dk-DK', {year: 'numeric', month: 'long', day: 'numeric'})
    var date_last_format = new Date(datapoints[specimen_last].date).toLocaleDateString('dk-DK', {year: 'numeric', month: 'long', day: 'numeric'})
    
    //runs the function days between
    daysBetween()

    const case1 = {
        title: t('model.case1.title'),
        text: t('model.case1.text'),
        calculation: t('model.case1.calculation', { testNumber: specimen_base + 1 })
    };

    const case2 = {
        title: t('model.case2.title'),
        text: t('model.case2.text'),
        calculation: t('model.case2.calculation', { testNumber: specimen_base + 1 })
    };

    const case3 = {
        title: t('model.case3.title'),
        text: t('model.case3.text'),
        calculation: t('model.case3.calculation', { testNumber: specimen_base + 1 })
    };

    const case4 = {
        title: t('model.case4.title'),
        text: t('model.case4.text', { date: date_base_format }),
        calculation: t('model.case4.calculation', { testNumber: specimen_base + 1 })
    };

    const case5 = {
        title: t('model.case5.title'),
        text: t('model.case5.text'),
        calculation: t('model.case5.calculation', { testNumber: specimen_last + 1 })
    };

    const case6 = {
        calculation: t('model.case6.calculation', { testNumber1: specimen_base + 1, testNumber2: specimen_last + 1 }),

        case6_1: {
            title: t('model.case6.case6_1.title'),
            text: t('model.case6.case6_1.text', { date: date_last_format })
        },

        case6_2: {
            title: t('model.case6.case6_2.title'),
            text: t('model.case6.case6_2.text', { date: date_last_format })
        },

        case6_3: {
            title: t('model.case6.case6_3.title'),
            text: t('model.case6.case6_3.text', { date: date_base_format, nextDate: new Date(datapoints[specimen_base].date).addDays(15).toLocaleDateString('dk-DK', { year: 'numeric', month: 'long', day: 'numeric' }) })
        },
        case6_4: {
            case6_4_1: {
                title: t('model.case6.case6_4_1.title'),
                text: t('model.case6.case6_4_1.text', { date: date_last_format })
            },
            case6_4_2: {
                title: t('model.case6.case6_4_2.title'),
                text: t('model.case6.case6_4_2.text', { date: date_last_format })
            }
        },

        case6_5: {
            title: t('model.case6.case6_5.title'),
            text: t('model.case6.case6_5.text', { date1: date_base_format, date2: date_last_format }),
            calculation: t('model.case6.case6_5.calculation', { testNumber1: specimen_base + 1, testNumber2: specimen_last + 1 })
        }
    };

    const case7 = {
        title: t('model.case7.title'),
        text: t('model.case7.text', { date: date_base_format }),
        calculation: t('model.case7.calculation')
    };

    const case8 = {
        title: t('model.case8.title'),
        text: t('model.case8.text', { date1: date_base_format, date2: date_last_format }),
        calculation: t('model.case8.calculation', { testNumber1: specimen_base + 1, testNumber2: specimen_last + 1 })
    };

    const case9 = {
        title: t('model.case9.title'),
        text: t('model.case9.text', { date1: date_base_format, date2: date_last_format }),
        calculation: t('model.case9.calculation', { testNumber1: specimen_base + 1, testNumber2: specimen_last + 1 })
    };

    const case10 = {
        title: t('model.case10.title'),
        text: t('model.case10.text'),
        calculation: t('model.case10.calculation', { date1: date_base_format, date2: date_last_format })
    };

    const case11 = {
        title: t('model.case11.title'),
        text: t('model.case11.text'),
        calculation: t('model.case11.calculation', { date1: date_base_format, date2: date_last_format })
    };

    //checks if the difference between the base date and last day is not above 30 days 
    //if it is, it tries the next one until it finds the next basedate. 
    function daysBetween(){
        var daysbetween = (date_last.getTime() - date_base.getTime()) / (1000 * 3600 * 24) 
        answers.outside = '';
        if (daysbetween >= 31){
            answers.outside = t('defaultAnswers.outside')
        }
    }

    //calculations for the base specimen
    let convertSpecimen_base
    if (unit === 'mg/mol') {
        convertSpecimen_base = datapoints[specimen_base].value * 1000/113.12; 
    } else {
        convertSpecimen_base = datapoints[specimen_base].value
    }

    let roundedSpecimen_base = Math.floor(convertSpecimen_base);
    let base_date = new Date(datapoints[specimen_base].date)
    
    //initiate the variable for the last specimen and assign it null
    let convertSpecimen_last = null
    let roundedSpecimen_last = null
    let last_date = null

    var totalHours = null

    if (modelType === "cronical"){
        cronical();
        updateDatapoints();
    }
    else if (modelType === "occational"){
        
        calcRatioOCC(); 
        updateDatapoints();
    }

    function updateDatapoints(){
        var item = datapoints[datapoints.length - 1];
        setDatapoints([...datapoints.filter((x) => x.id !== item.id),
            {
                id: item.id,
                date: item.date,
                value: item.value,
                answertitle: answers.title,
                qantity: [...datapoints].find((a) => a.id === item.id).qantity - 1, 
                //If increment + 1 & decrement - 1 
            },
        ])
    }

    //the if-statement that initiate the correct calculations, whether there is one or more specimens. 
    function cronical(){
        if (datapoints.length === 1 || specimen_last === specimen_base){
            above800(convertSpecimen_base); 
        }
        else{
            //assignes the variables for the last specimen
            
            if (unit === 'mg/mol') {
                convertSpecimen_last = datapoints[specimen_last].value * 1000/113.12;
            } else {
                convertSpecimen_last = datapoints[specimen_last].value
            }

            roundedSpecimen_last = Math.floor(convertSpecimen_last);

            last_date = new Date(datapoints[specimen_last].date)
            
            //calculates the hours between the tests
            const hours = 60 * 60 * 1000; 
            totalHours = (last_date.getTime() - base_date.getTime()) / hours;
            totalHours = Math.round(totalHours)
            calcRatio(); 
        }
    }

    //gives an answer based on one test
    function above800(roundedSpecimen_base){
        if (roundedSpecimen_base <= param.concentration[1]){
            answers.title = case3.title
            answers.text = case3.text
            answers.calculation = case3.calculation
            specimen_base = specimen_base + 1
            answers.borderColor = blackBorder
            old_title = 1;
        }
        else if (roundedSpecimen_base > param.concentration[9]){
            answers.title = case4.title
            answers.text = case4.text
            answers.calculation = case4.calculation
            specimen_base = specimen_base + 1
            answers.borderColor = blackBorder
            old_title = 1;
        }
        else{
            if (roundedSpecimen_base > 800) {
                answers.title = case1.title
                answers.text = case1.text
                answers.borderColor = normalBorder
                answers.calculation = case1.calculation
                old_title = 1;
            } else {
                answers.title = case2.title
                answers.text = case2.text
                answers.borderColor = normalBorder
                answers.calculation = case2.calculation
                old_title = 1;
            }
        }
    }

    // calculates the ratio between the last and base specimens
    function calcRatio() {
        let ratio = roundedSpecimen_last / roundedSpecimen_base; 
        let roundedRatio = Math.floor(ratio * 100 ) / 100 

        findA(roundedRatio); 
    }

    function findA(roundedRatio) {
        if (roundedSpecimen_base <= param.concentration[1]) {
            answers.title = case3.title
            answers.text = case3.text
            answers.borderColor = blackBorder
            answers.calculation = case3.calculation
            specimen_base = specimen_last
            old_title = 1;
        } 
        else if (roundedSpecimen_base > param.concentration[1] && roundedSpecimen_base < param.concentration[2]) {
            upperLimit(param.A[1], param.k[1], totalHours, param.S2[1], param.RMS[1], roundedRatio)
        } 
        else if (roundedSpecimen_base > param.concentration[2] && roundedSpecimen_base < param.concentration[3]) {
            upperLimit(param.A[2], param.k[2], totalHours, param.S2[2], param.RMS[2], roundedRatio)
        } 
        else if (roundedSpecimen_base > param.concentration[3] && roundedSpecimen_base < param.concentration[4]) {
            upperLimit(param.A[3], param.k[3], totalHours, param.S2[3], param.RMS[3], roundedRatio)
        } 
        else if (roundedSpecimen_base > param.concentration[4] && roundedSpecimen_base < param.concentration[5]) {
            upperLimit(param.A[4], param.k[4], totalHours, param.S2[4], param.RMS[4], roundedRatio)
        } 
        else if (roundedSpecimen_base > param.concentration[5] && roundedSpecimen_base < param.concentration[6]) {
            upperLimit(param.A[5], param.k[5], totalHours, param.S2[5], param.RMS[5], roundedRatio)
        }
        else if (roundedSpecimen_base > param.concentration[6] && roundedSpecimen_base < param.concentration[7]) {
            upperLimit(param.A[6], param.k[6], totalHours, param.S2[6], param.RMS[6], roundedRatio)
        }
        else if (roundedSpecimen_base > param.concentration[7] && roundedSpecimen_base < param.concentration[8]) {
            upperLimit(param.A[7], param.k[7], totalHours, param.S2[7], param.RMS[7], roundedRatio)
        }
        else if (roundedSpecimen_base > param.concentration[8] && roundedSpecimen_base < param.concentration[9]) {
            upperLimit(param.A[8], param.k[8], totalHours, param.S2[8], param.RMS[8], roundedRatio)
        }
        else if (roundedSpecimen_base > param.concentration[9] ) {
            answers.title = case4.title
            answers.text = case4.text
            answers.borderColor = blackBorder
            answers.calculation = case4.calculation
            specimen_base = specimen_last
            old_title = 1;
        }
    }

    //calculates the upper limit for the correct parameters
    function upperLimit(A, k, t, S2, RMS, ratio) { 
        let result = (A * Math.exp(-k * t)) + (2.57*(Math.sqrt(S2+RMS))); 
        autoInterpretation(result, ratio);
    }

    //Assignes the correct result based on the result and ratio, as well as other elements
    function autoInterpretation(result, ratio) {
        if (roundedSpecimen_last <= param.concentration[1]){
            answers.title = case5.title
            answers.text = case5.text
            answers.calculation = case5.calculation
            answers.borderColor = blackBorder
            specimen_base = specimen_last
        }
        else if (roundedSpecimen_last > param.concentration[9]){
            answers.title = case4.title
            answers.text =  case4.text
            answers.calculation = case4.calculation
            answers.borderColor = blackBorder
            specimen_base = specimen_last
        }
        else {
            if (result < ratio) {
                answers.borderColor = redBorder
                answers.calculation = case6.calculation
                if (roundedSpecimen_base >= 800) {
                    if(roundedSpecimen_last < 200){
                        answers.title = case6.case6_1.title
                        answers.text = case6.case6_1.text
                    }
                    else if (specimen_last - specimen_base >= 1 && old_title === 0)
                    {
                        answers.title = case6.case6_2.title
                        answers.text = case6.case6_2.text
                    }
                    else{
                        answers.title = case6.case6_3.title
                        //Connected to the Date.prototype.addDays method to add 15 days
                        var rawDatObject = new Date(datapoints[specimen_last].date)
                        // Converts the date into a string with the month name. 
                        
                        answers.text = case6.case6_3.text
                        answers.borderColor = orangeBorder
                    }
                }
                else if (roundedSpecimen_base < 800) {
                    if (specimen_last > 1 && old_title === 0){
                        answers.title = case6.case6_4.case6_4_1.Titel
                        answers.text = case6.case6_4.case6_4_1.text
                        answers.borderColor = redBorder
                    }
                    else
                    {
                        answers.title = case6.case6_4.case6_4_2.title
                        answers.text = case6.case6_4.case6_4_2.text
                        answers.borderColor = orangeBorder
                    }
                }
                specimen_base = specimen_last
            } 
            else if (result > ratio) {
                answers.title = case6.case6_5.title
                answers.borderColor = greenBorder
                answers.text = case6.case6_5.text
                answers.calculation = case6.case6_5.calculation 
            } 
            else if (result = null){
            }
            old_title = 0;
        }
    }  

    //calculates the ratio of occational specimens
    function calcRatioOCC(){
        //if it is one sample or none
        if (datapoints.length === 1){
            answers.title = case7.title
            answers.text = case7.text
            answers.calculation = case7.calculation
            answers.borderColor = normalBorder
        }
        else{
            if (unit === 'mg/mol') {
                convertSpecimen_last = datapoints[specimen_last].value * 1000/113.12; 
            } else {
                convertSpecimen_last = datapoints[specimen_last].value
            }

            roundedSpecimen_last = Math.floor(convertSpecimen_last);
            
            last_date = new Date(datapoints[specimen_last].date)

            const hours = 60 * 60 * 1000; 
            totalHours = (last_date.getTime() - base_date.getTime()) / hours;
            totalHours = Math.round(totalHours)


            let ratio = roundedSpecimen_last / roundedSpecimen_base;

            let roundedRatio = Math.floor(ratio * 100) / 100 
            calculateOCC(totalHours, roundedRatio); 

        }
    }
}


    function calculateOCC(totalHours, roundedRatio) {

        if (totalHours <= param.time[1]) {
            
            answers.title = case10.title
            answers.text = case10.text
            answers.calculation = case10.calculation
            answers.borderColor = blackBorder
            specimen_base = specimen_last

            old_title = 1;
        } 
        else if (totalHours > param.time[1] && totalHours <= param.time[2]) {
            
            result(param.max[1], roundedRatio)
        } 
        else if (totalHours > param.time[2] && totalHours <= param.time[3]) {
            
            result(param.max[2], roundedRatio)
        } 
        else if (totalHours > param.time[3] && totalHours <= param.time[4]) {
            
            result(param.max[3], roundedRatio)
        } 
        else if (totalHours > param.time[4] && totalHours <= param.time[5]) {
            
            result(param.max[4], roundedRatio)
        } 
        else if (totalHours > param.time[5] && totalHours <= param.time[6]) {
            
            result(param.max[5], roundedRatio)
        } 
        else if (totalHours > param.time[6] ) {
            
            answers.title = case11.title
            answers.text = case11.text
            answers.calculation = case11.calculation
            answers.borderColor = blackBorder
            specimen_base = specimen_last
            old_title = 1;
        }
    }

    function result(max, ratio) {
        
        if (ratio > max){
            answers.title = case9.title
            answers.text = case9.text
            answers.calculation = case9.calculation
            answers.borderColor = redBorder
            
            specimen_base = specimen_last

        }
        else{
            answers.title = case8.title
            answers.text = case8.text
            answers.calculation = case8.calculation
            answers.borderColor = greenBorder
            
            specimen_base = specimen_last
        }
    }
//Prototype added to the Date object. It adds days to the date. 
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
