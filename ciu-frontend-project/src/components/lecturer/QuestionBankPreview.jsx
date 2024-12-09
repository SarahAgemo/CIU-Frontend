// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import BackButton from "../../components/lecturer/BackButton";
// import Header from '../../components/lecturer/HeaderPop';
// import Sidebar from '../../components/lecturer/SideBarPop';
// import MobileMenu from "../../components/lecturer/MobileMenu";
// import Dash from '../../components/lecturer/LecturerDashboard.module.css';
// import '../../components/lecturer/QuestionBankPreview.css';

// const QuestionBankPreview = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const { bankId } = useParams();
//   const [hoveredQuestionId, setHoveredQuestionId] = useState(null);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 991);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(`https://c-i-u-backend.onrender.com/question-bank/${bankId}/questions`);
//         const data = await response.json();
//         setQuestions(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [bankId]);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={Dash["overall"]}>
//       <div className={Dash["dashboard"]}>
//         <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//         <div className={Dash["dashboard-content"]}>
//           {!isMobile && <Sidebar />}
//           {isMobile && (
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               toggleMenu={toggleMobileMenu}
//             />
//           )}
//           <div className={Dash.backButtonContainer}>
//             <BackButton targetPath={"/question-bank"} size={30} color="#106053" />
//           </div>

//           {/* Main Content Section */}
//           <div className="question-preview__container">
//             <h2 className="question-preview__heading">Question Bank Preview</h2>

//             {questions.map((question, index) => (
//               <div
//                 key={question.id}
//                 className={`question-preview__item ${
//                   hoveredQuestionId === question.id ? 'hovered' : ''
//                 }`}
//                 onMouseEnter={() => setHoveredQuestionId(question.id)}
//                 onMouseLeave={() => setHoveredQuestionId(null)}
//               >
//                 <h3 className="question-preview__title">
//                   Qn{index + 1}: {question.content}
//                 </h3>
//                 {question.options && (
//                   <div className="question-preview__options">
//                     <h4>Options:</h4>
//                     <form>
//                       {question.options.map((option, i) => (
//                         <div key={i}>
//                           <label>
//                             <input
//                               type="radio"
//                               name={`question-${question.id}`} // Group by question ID
//                               value={option}
//                             />
//                             {option}
//                           </label>
//                         </div>
//                       ))}
//                     </form>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionBankPreview;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/lecturer/HeaderPop';
import Sidebar from '../../components/lecturer/SideBarPop';
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from '../../components/lecturer/LecturerDashboard.module.css';
import '../../components/lecturer/QuestionBankPreview.css';

const QuestionBankPreview = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { bankId } = useParams();
  const [hoveredQuestionId, setHoveredQuestionId] = useState(null);

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
        const response = await fetch(`https://c-i-u-backend.onrender.com/question-bank/${bankId}/questions`);
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

          {/* Main Content Section */}
          <div className="question-preview__container">
            <h2 className="question-preview__heading">Question Bank Preview</h2>

            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`question-preview__item ${hoveredQuestionId === question.id ? 'hovered' : ''
                  }`}
                onMouseEnter={() => setHoveredQuestionId(question.id)}
                onMouseLeave={() => setHoveredQuestionId(null)}
              >
                <h3 className="question-preview__title">
                  Qn{index + 1}: {question.content}
                </h3>
                {question.options && (
                  <div className="question-preview__options">
                    <h4>Options:</h4>
                    <form>
                      {question.options.map((option, i) => (
                        <div key={i}>
                          <label>
                            <input
                              type="radio"
                              name={`question-${question.id}`} // Group by question ID
                              value={option}
                            />
                            {option}
                          </label>
                        </div>
                      ))}
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankPreview;
