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
  specimenBase: number
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
  setSpecimenBase: (setSpecimenBase: number) => void;
}

export type Utilities = {
  isOpen: boolean;
  toggleModal: () => void;
  warning: React.ReactNode | null;
  isWarningOpen: boolean;
  setOpenWarning: (isWarningOpen: boolean) => void;
  setWarning: (warning: React.ReactNode) => void;
  shouldAnimate: boolean;
  setShouldAnimate: (shouldAnimate: boolean) => void;
}
