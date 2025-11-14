'use client';

import { useState, useEffect } from 'react';
import { QuizQuestion, UserAnswer } from '@/types/quiz';
import { getRandomQuestions, checkAnswer } from '@/utils/quiz';
import QuestionCard from '@/components/QuestionCard';
import ResultsScreen from '@/components/ResultsScreen';
import WelcomeScreen from '@/components/WelcomeScreen';
import testBankData from '@/data/test-bank.json';
import { AnimatePresence } from 'framer-motion';

export default function QuizPage() {
  const [gameState, setGameState] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const startQuiz = () => {
    const randomQuestions = getRandomQuestions(testBankData, 20);
    setQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
    setAnswers([]);
    setIsSubmitted(false);
    setGameState('quiz');
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = checkAnswer(currentAnswer, currentQuestion.answer, currentQuestion.type);
    
    const newAnswer: UserAnswer = {
      questionIndex: currentQuestionIndex,
      answer: currentAnswer,
      isCorrect
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setIsSubmitted(true);

    // Move to next question or show results after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentAnswer('');
        setIsSubmitted(false);
      } else {
        setGameState('results');
      }
    }, 1500);
  };

  const handleRestart = () => {
    setGameState('welcome');
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
    setAnswers([]);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 relative z-10">
      <AnimatePresence mode="wait">
        {gameState === 'welcome' && (
          <WelcomeScreen 
            onStart={startQuiz}
            totalQuestions={testBankData.totalQuestions}
          />
        )}

        {gameState === 'quiz' && questions.length > 0 && (
          <QuestionCard
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            answer={currentAnswer}
            onAnswerChange={setCurrentAnswer}
            onSubmit={handleSubmitAnswer}
            isSubmitted={isSubmitted}
          />
        )}

        {gameState === 'results' && (
          <ResultsScreen
            answers={answers}
            questions={questions}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
