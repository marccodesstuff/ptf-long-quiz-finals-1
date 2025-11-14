'use client';

import { motion } from 'framer-motion';
import { UserAnswer, QuizQuestion } from '@/types/quiz';
import { generatePDFReviewer } from '@/utils/pdf';
import { useState } from 'react';

interface ResultsScreenProps {
  answers: UserAnswer[];
  questions: QuizQuestion[];
  onRestart: () => void;
}

export default function ResultsScreen({ answers, questions, onRestart }: ResultsScreenProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalCount = answers.length;
  const percentage = Math.round((correctCount / totalCount) * 100);
  
  const getGrade = (percent: number) => {
    if (percent >= 90) return { grade: 'A', color: 'text-green-600', emoji: '🎉' };
    if (percent >= 80) return { grade: 'B', color: 'text-blue-600', emoji: '👏' };
    if (percent >= 70) return { grade: 'C', color: 'text-yellow-600', emoji: '👍' };
    if (percent >= 60) return { grade: 'D', color: 'text-orange-600', emoji: '📚' };
    return { grade: 'F', color: 'text-red-600', emoji: '💪' };
  };

  const result = getGrade(percentage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      {/* Score Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          {result.emoji}
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
          Quiz Complete!
        </h1>
        
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className={`text-8xl md:text-9xl font-black ${result.color} mb-4`}
          >
            {percentage}%
          </motion.div>
          <p className="text-2xl text-gray-300">
            {correctCount} out of {totalCount} correct
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 h-4 bg-gray-200 rounded-full overflow-hidden max-w-md mx-auto"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 1, duration: 1 }}
              className={`h-full rounded-full ${
                percentage >= 80 ? 'bg-green-500' :
                percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
        >
          Take Another Quiz
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isGenerating}
          onClick={async () => {
            setIsGenerating(true);
            try {
              await generatePDFReviewer(questions, answers, { correct: correctCount, total: totalCount });
            } catch (error) {
              console.error('Error generating PDF:', error);
            }
            setIsGenerating(false);
          }}
          className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating PDF...' : '📥 Download Reviewer PDF'}
        </motion.button>
      </motion.div>

      {/* Detailed Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12"
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-6">Review Your Answers</h2>
        
        <div className="space-y-4">
          {answers.map((answer, index) => {
            const question = questions[answer.questionIndex];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className={`p-6 rounded-2xl border-2 ${
                  answer.isCorrect
                    ? 'border-green-800 bg-green-900/20'
                    : 'border-red-800 bg-red-900/20'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-400 mb-1">
                      Project {question.projectNumber}: {question.projectName}
                    </div>
                    <div className="font-semibold text-gray-200 mb-2">
                      Q{index + 1}. {question.question}
                    </div>
                  </div>
                  <div className="text-2xl ml-4">
                    {answer.isCorrect ? '✅' : '❌'}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-400">Your answer: </span>
                    <span className={answer.isCorrect ? 'text-green-400' : 'text-red-400'}>
                      {answer.answer}
                    </span>
                  </div>
                  {!answer.isCorrect && (
                    <div>
                      <span className="font-semibold text-gray-400">Correct answer: </span>
                      <span className="text-green-400">{question.answer}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
