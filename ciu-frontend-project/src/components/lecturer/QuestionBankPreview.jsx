// QuestionBankPreview.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuestionBankPreview = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bankId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/question-bank/${bankId}/questions`);
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [bankId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Question Bank Preview</h2>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="border p-4 rounded">
              <h3 className="font-bold">Question {index + 1}</h3>
              <p className="mt-2">{question.content}</p>
              {question.options && (
                <div className="mt-2">
                  <h4 className="font-semibold">Options:</h4>
                  <ul className="list-disc ml-6">
                    {question.options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBankPreview;