'use client';

import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  isSubmitted: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswerChange,
  onSubmit,
  isSubmitted
}: QuestionCardProps) {
  const isTrueFalse = question.type === "True or False";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-400">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-indigo-400">
              {Math.round((questionNumber / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            />
          </div>
        </div>

        {/* Project Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            Project {question.projectNumber}: {question.projectName}
          </div>
        </motion.div>

        {/* Question Type Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="inline-block mb-6 ml-3"
        >
          <div className={`px-4 py-2 rounded-full text-xs font-bold ${
            isTrueFalse 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {question.type}
          </div>
        </motion.div>

        {/* Question Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-100 mb-8 leading-relaxed break-words"
        >
          {question.question}
        </motion.h2>

        {/* Answer Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isTrueFalse ? (
            <div className="space-y-4">
              {['True', 'False'].map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAnswerChange(option)}
                  disabled={isSubmitted}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-semibold text-lg transition-all ${
                    answer === option
                      ? 'border-indigo-500 bg-indigo-900/30 text-indigo-300 shadow-lg'
                      : 'border-gray-600 bg-slate-700 text-gray-300 hover:border-indigo-600 hover:bg-indigo-900/20'
                  } ${isSubmitted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      answer === option
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}>
                      {answer === option && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      )}
                    </div>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              disabled={isSubmitted}
              placeholder="Type your answer here..."
              className="w-full p-5 rounded-2xl border-2 border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-900/50 outline-none text-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-100 bg-slate-700 placeholder:text-gray-500"
            />
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-8"
        >
          {isSubmitted ? (
            <div className="w-full py-5 bg-slate-700 rounded-2xl flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-3 border-indigo-400 border-t-transparent rounded-full"
              />
              <span className="font-bold text-gray-300">Checking answer...</span>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSubmit}
              disabled={!answer.trim()}
              className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Submit Answer
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
