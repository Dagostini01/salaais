export interface Answer {
  id: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  question: string;
  bloco: number;
  materia: string;
  descricao: string;
  answers: Answer[];
}

export interface QuizData {
  items: number;
  data: Question[];
}
