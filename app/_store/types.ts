export type DataPoint = {
  id: any;
  value: number;
  date: Date | string;
  answerTitle: string;
  answerBorder: string;
  answer: Answers;
}

export type Answers = {
  title: string;
  text: string;
  borderColor: string;
  calculation: string;
  outside: string;
  baseDate: Date | null;
  lastDate: Date | null;
  specimenBase: number;
  specimenLast: number;
  status: string | null;
}

export type AnswersState = {
  answers: Answers;
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setBorderColor: (color: string) => void;
  setCalculation: (calculation: string) => void;
  setOutside: (outside: string) => void;
  // setSpecimenBaseDate: (specimenBaseDate: Date) => void;
  // setSpecimenLastDate: (specimenLastDate: Date) => void;
  setBaseDate: (baseDate: Date) => void;
  setLastDate: (lastDate: Date) => void;
  setSpecimenBase: (setSpecimenBase: number) => void;
  setSpecimenLast: (setSpecimenLast: number) => void;
  setStatus: (setStatus: string) => void;
}

export type UnitType = "mg/mol" | "mg/dL";
export type ModelType = "cronical" | "occational";


export type Utilities = {
  isOpen: boolean;
  toggleModal: () => void;
  warning: React.ReactNode | null;
  isWarningOpen: boolean;
  setOpenWarning: (isWarningOpen: boolean) => void;
  setWarning: (warning: React.ReactNode) => void;
  shouldAnimate: boolean;
  setShouldAnimate: (shouldAnimate: boolean) => void;
  lang: string;
  setLang: (value: string) => void;
  unit: UnitType;
  setUnit: (value: UnitType) => void;
}

export type ModelStore = {
  model: ModelType;
  setModel: (value: ModelType) => void;
}
