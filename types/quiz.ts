export interface Question {
  type: "True or False" | "Identification";
  number: number;
  question: string;
  answer: string;
}

export interface Project {
  projectNumber: number;
  projectName: string;
  authors: string[];
  questions: Question[];
}

export interface TestBank {
  title: string;
  source: string;
  totalProjects: number;
  totalQuestions: number;
  projects: Project[];
}

export interface QuizQuestion extends Question {
  projectName: string;
  projectNumber: number;
}

export interface UserAnswer {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
}
