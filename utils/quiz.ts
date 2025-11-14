import { TestBank, QuizQuestion } from '@/types/quiz';

export function getAllQuestions(testBank: TestBank): QuizQuestion[] {
  const allQuestions: QuizQuestion[] = [];
  
  testBank.projects.forEach(project => {
    project.questions.forEach(question => {
      allQuestions.push({
        ...question,
        projectName: project.projectName,
        projectNumber: project.projectNumber
      });
    });
  });
  
  return allQuestions;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomQuestions(testBank: TestBank, count: number = 20): QuizQuestion[] {
  const allQuestions = getAllQuestions(testBank);
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function normalizeAnswer(answer: string): string {
  return answer.toLowerCase().trim();
}

export function checkAnswer(userAnswer: string, correctAnswer: string, questionType: string): boolean {
  const normalized = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  
  if (questionType === "True or False") {
    // Handle true/false variations
    const trueVariants = ['true', 't', 'yes', 'y'];
    const falseVariants = ['false', 'f', 'no', 'n'];
    
    const isUserTrue = trueVariants.includes(normalized);
    const isUserFalse = falseVariants.includes(normalized);
    const isCorrectTrue = normalizedCorrect.includes('true');
    
    return (isUserTrue && isCorrectTrue) || (isUserFalse && !isCorrectTrue);
  }
  
  // For identification questions, check if the answer is contained or matches
  return normalized === normalizedCorrect || 
         normalizedCorrect.includes(normalized) || 
         normalized.includes(normalizedCorrect);
}
