// types.tsx
export interface Answer {
  id: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  question: string;
  materia: string;
  answers: Answer[];
  descricao?: string;
}
