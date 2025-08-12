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
  answers: Answer[];
  descricao?: string; // Optional field for question description
}

export interface QuizData {
  items: number;
  data: Question[];
}
