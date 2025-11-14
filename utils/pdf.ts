import { jsPDF } from 'jspdf';
import { QuizQuestion, UserAnswer } from '@/types/quiz';

export async function generatePDFReviewer(
  questions: QuizQuestion[],
  answers: UserAnswer[],
  score: { correct: number; total: number }
) {
  const pdf = new jsPDF();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with wrapping
  const addWrappedText = (text: string, fontSize: number, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = pdf.splitTextToSize(text, maxWidth);
    
    // Check if we need a new page
    if (yPosition + lines.length * 5 > pageHeight - 10) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * 5 + 3;
    
    return yPosition;
  };

  // Title
  pdf.setFillColor(99, 102, 241); // Indigo
  pdf.rect(0, 0, pageWidth, 25, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PTF50 Quiz Reviewer', margin, 16);
  
  pdf.setTextColor(0, 0, 0);
  yPosition = 35;

  // Score Summary
  const percentage = Math.round((score.correct / score.total) * 100);
  
  pdf.setFillColor(240, 244, 255);
  pdf.rect(margin, yPosition - 5, maxWidth, 20, 'F');
  
  addWrappedText(
    `Score: ${score.correct}/${score.total} (${percentage}%)`,
    14,
    true
  );

  yPosition += 5;

  // Questions and Answers
  addWrappedText('Quiz Questions & Answers', 12, true);

  answers.forEach((answer, index) => {
    const question = questions[answer.questionIndex];
    const status = answer.isCorrect ? '✓ CORRECT' : '✗ INCORRECT';
    
    // Question number and project
    addWrappedText(
      `Q${index + 1}. [Project ${question.projectNumber}: ${question.projectName}]`,
      10,
      true
    );
    
    // Question type
    addWrappedText(`Type: ${question.type}`, 9);
    
    // Question text
    addWrappedText(`Question: ${question.question}`, 10);
    
    // User's answer
    if (answer.isCorrect) {
      pdf.setTextColor(34, 197, 94); // Green
    } else {
      pdf.setTextColor(220, 38, 38); // Red
    }
    addWrappedText(`Your Answer: ${answer.answer}`, 10, true);
    
    // Correct answer (if wrong)
    if (!answer.isCorrect) {
      pdf.setTextColor(34, 197, 94); // Green
      addWrappedText(`Correct Answer: ${question.answer}`, 10, true);
    }
    
    pdf.setTextColor(0, 0, 0);
    pdf.setDrawColor(200, 200, 200);
    yPosition += 3;
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
  });

  // Save the PDF
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(/[/:]/g, '-');
  
  pdf.save(`PTF50-Quiz-Reviewer-${timestamp}.pdf`);
}
