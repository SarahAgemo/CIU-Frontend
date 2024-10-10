import React from 'react';

const examResults = [
  {
    datePublished: '17/08/2023',
    subject: 'Logistics',
    score: '75%',
    grade: 'B',
  },
  {
    datePublished: '17/08/2023',
    subject: 'Macro Economics',
    score: '90%',
    grade: 'A',
  },
];

const ExaminationResults = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>EXAMINATION RESULTS</h1>
      <img
        src="https://example.com/exam-icon.png" // Replace with the actual URL of the image you want to display
        alt="Exam icon"
        style={{ width: '100px', height: 'auto', marginBottom: '20px' }}
      />
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date Published</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subject</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {examResults.map((result, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.datePublished}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.subject}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.score}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExaminationResults;
