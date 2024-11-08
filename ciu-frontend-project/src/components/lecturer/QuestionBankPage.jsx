import { useState, useEffect } from 'react';
import { Trash2, Eye, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const QuestionBank = () => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionBanks();
  }, []);

  const fetchQuestionBanks = async () => {
    try {
      const response = await fetch('http://localhost:3000/question-bank');
      const data = await response.json();
      
      // Fetch questions for each bank
      const banksWithQuestions = await Promise.all(
        data.map(async (bank) => {
          const questionsResponse = await fetch(`http://localhost:3000/question-bank/${bank.id}/questions`);
          const questions = await questionsResponse.json();
          return { ...bank, questions };
        })
      );

      // Group banks by course unit
      const groupedBanks = banksWithQuestions.reduce((acc, bank) => {
        if (!acc[bank.courseUnit]) {
          acc[bank.courseUnit] = [];
        }
        acc[bank.courseUnit].push(bank);
        return acc;
      }, {});
      
      setQuestionBanks(groupedBanks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching question banks:', error);
      setLoading(false);
    }
  };

  const deleteQuestionBank = async (id) => {
    try {
      await fetch(`http://localhost:3000/question-bank/${id}`, { method: 'DELETE' });
      fetchQuestionBanks();
    } catch (error) {
      console.error('Error deleting question bank:', error);
    }
  };

  const handlePreview = (bankId) => {
    navigate(`/question-bank/${bankId}/preview`);
  };

  const generatePDF = (bank) => {
    if (!bank.questions || !Array.isArray(bank.questions)) {
      console.error("Questions are not available or invalid.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    let yOffset = 20;

    // Title
    doc.text(`Question Bank: ${bank.courseUnit} - ${bank.courseUnitCode}`, 10, yOffset);
    yOffset += 15;

    // Metadata
    doc.setFontSize(12);
    doc.text(`Created by: ${bank.createdBy}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Total Questions: ${bank.questionCount}`, 10, yOffset);
    yOffset += 15;

    // Questions
    doc.setFontSize(12);
    bank.questions.forEach((question, index) => {
      // Check if we need a new page
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }

      doc.text(`${index + 1}. ${question.content}`, 10, yOffset);
      yOffset += 10;

      if (Array.isArray(question.options)) {
        question.options.forEach((option, optIndex) => {
          // Check if we need a new page for options
          if (yOffset > 270) {
            doc.addPage();
            yOffset = 20;
          }
          
          doc.text(`    ${String.fromCharCode(65 + optIndex)}. ${option}`, 10, yOffset);
          yOffset += 7;
        });
      }

      yOffset += 5; // Space between questions
    });

    doc.save(`${bank.courseUnitCode}_${bank.courseUnit}_QuestionBank.pdf`);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Question Banks</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2 text-left">Course Unit</th>
                <th className="border p-2 text-left">Unit Code</th>
                <th className="border p-2 text-left">Questions</th>
                <th className="border p-2 text-left">Created By</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(questionBanks).map(([courseUnit, banks]) => (
                banks.map((bank) => (
                  <tr key={bank.id} className="hover:bg-gray-50">
                    <td className="border p-2">{courseUnit}</td>
                    <td className="border p-2">{bank.courseUnitCode}</td>
                    <td className="border p-2">{bank.questionCount}</td>
                    <td className="border p-2">{bank.createdBy}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => handlePreview(bank.id)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => deleteQuestionBank(bank.id)}
                        className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                      <button
                        onClick={() => generatePDF(bank)}
                        className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;