export type DataPoint = {
  id: any;
  value: number;
  date: Date;
  answerTitle: string;
  answerBorder: string;
}

export type Answers = {
  title: string;
  text: string;
  borderColor: string;
  calculation: string;
  outside: string;
  specimenBaseDate: Date | ''; 
  specimenLastDate: Date | ''; 
}

export type AnswersState = {
  answers: Answers;
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setBorderColor: (color: string) => void;
  setCalculation: (calculation: string) => void;
  setOutside: (outside: string) => void;
  setSpecimenBaseDate: (specimenBaseDate: Date) => void;
  setSpecimenLastDate: (specimenLastDate: Date) => void;
}
