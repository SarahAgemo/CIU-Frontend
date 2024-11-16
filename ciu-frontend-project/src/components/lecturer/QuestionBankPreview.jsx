import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/lecturer/HeaderPop';
import Sidebar from '../../components/lecturer/SideBarPop';
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from '../../components/lecturer/LecturerDashboard.module.css';
import './QuestionBankPreview.css';

const QuestionBankPreview = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { bankId } = useParams();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={Dash["overall"]}>
      <div className={Dash["dashboard"]}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              toggleMenu={toggleMobileMenu}
            />
          )}

          {/* Content Section with Custom Inline Styling */}
          <div style={{
            
            backgroundColor: 'white',
           
            marginTop: '1rem' ,   
           
            alignItems: 'center',
            padding: '15px',
            width: '800px',
            borderRadius: '6px',
           
            transition: 'box-shadow 0.3s ease',
          }}
         >
            
            <div style={{ marginBottom: '1.5rem' }}>
              {questions.map((question, index) => (
                <div key={question.id} style={{
                  padding: '1rem',
                  marginBottom: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  transition: 'box-shadow 0.3s ease',  // Smooth transition effect
                  boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                
                }} onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                  <h3 className="font-bold">Question {index + 1}</h3>
                  <p className="mt-2">{question.content}</p>
                  {question.options && (
                    <div className="mt-2" style={{ display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '100px',}}>
                      <h4 className="font-semibold">Options:</h4>
                      <ul className="list-disc ml-6" style={{display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '10px',}}>
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
      </div>
    </div>
  );
};

export default QuestionBankPreview;
