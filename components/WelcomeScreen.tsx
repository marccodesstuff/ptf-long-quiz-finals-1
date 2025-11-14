'use client';

import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

export default function WelcomeScreen({ onStart, totalQuestions }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="text-7xl mb-6"
        >
          🎯
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl font-black text-gray-100 mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          PTF50 Quiz Reviewer
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-gray-300 mb-8"
        >
          Test your knowledge across all projects
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-700 rounded-2xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-400">{totalQuestions}</div>
              <div className="text-sm text-gray-300 font-medium">Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">16</div>
              <div className="text-sm text-gray-300 font-medium">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">🎲</div>
              <div className="text-sm text-gray-300 font-medium">Randomized</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3 mb-8 text-left"
        >
          <div className="flex items-center text-gray-300">
            <span className="text-2xl mr-3">📝</span>
            <span className="font-medium">Mix of True/False and Identification questions</span>
          </div>
          <div className="flex items-center text-gray-300">
            <span className="text-2xl mr-3">🔀</span>
            <span className="font-medium">Questions are randomly selected each time</span>
          </div>
          <div className="flex items-center text-gray-300">
            <span className="text-2xl mr-3">⚡</span>
            <span className="font-medium">Instant feedback on your answers</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
        >
          Start Quiz
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
