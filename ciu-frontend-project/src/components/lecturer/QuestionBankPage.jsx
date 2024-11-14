import React, { useState, useEffect } from "react";
import { Trash2, Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import styles from "./QuestionBankPage.module.css";

import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";

const QuestionBank = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [questionBanks, setQuestionBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBanks, setFilteredBanks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchQuestionBanks();
  }, []);

  // Filter banks when search term or questionBanks change
  useEffect(() => {
    const filterBanks = () => {
      if (!searchTerm) {
        setFilteredBanks(questionBanks);
        return;
      }

      const searchTermLower = searchTerm.toLowerCase();
      const filtered = Object.entries(questionBanks).reduce(
        (acc, [courseUnit, banks]) => {
          const filteredBanksList = banks.filter(
            (bank) =>
              bank.courseUnit.toLowerCase().includes(searchTermLower) ||
              bank.courseUnitCode.toLowerCase().includes(searchTermLower) ||
              bank.createdBy.toLowerCase().includes(searchTermLower)
          );

          if (filteredBanksList.length > 0) {
            acc[courseUnit] = filteredBanksList;
          }
          return acc;
        },
        {}
      );

      setFilteredBanks(filtered);
    };

    filterBanks();
  }, [searchTerm, questionBanks]);

  const fetchQuestionBanks = async () => {
    try {
      const response = await fetch("http://localhost:3000/question-bank");
      const data = await response.json();

      const banksWithQuestions = await Promise.all(
        data.map(async (bank) => {
          const questionsResponse = await fetch(
            `http://localhost:3000/question-bank/${bank.id}/questions`
          );
          const questions = await questionsResponse.json();
          return { ...bank, questions };
        })
      );

      const groupedBanks = banksWithQuestions.reduce((acc, bank) => {
        if (!acc[bank.courseUnit]) {
          acc[bank.courseUnit] = [];
        }
        acc[bank.courseUnit].push(bank);
        return acc;
      }, {});

      setQuestionBanks(groupedBanks);
      setFilteredBanks(groupedBanks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching question banks:", error);
      setLoading(false);
    }
  };

  const deleteQuestionBank = async (id) => {
    try {
      await fetch(`http://localhost:3000/question-bank/${id}`, {
        method: "DELETE",
      });
      fetchQuestionBanks();
    } catch (error) {
      console.error("Error deleting question bank:", error);
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

    doc.text(
      `Question Bank: ${bank.courseUnit} - ${bank.courseUnitCode}`,
      10,
      yOffset
    );
    yOffset += 15;

    doc.setFontSize(12);
    doc.text(`Created by: ${bank.createdBy}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Total Questions: ${bank.questionCount}`, 10, yOffset);
    yOffset += 15;

    bank.questions.forEach((question, index) => {
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }

      doc.text(`${index + 1}. ${question.content}`, 10, yOffset);
      yOffset += 10;

      if (Array.isArray(question.options)) {
        question.options.forEach((option, optIndex) => {
          if (yOffset > 270) {
            doc.addPage();
            yOffset = 20;
          }
          doc.text(
            `    ${String.fromCharCode(65 + optIndex)}. ${option}`,
            10,
            yOffset
          );
          yOffset += 7;
        });
      }

      yOffset += 5;
    });

    doc.save(`${bank.courseUnitCode}_${bank.courseUnit}_QuestionBank.pdf`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const searchContainerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "20px 0",
    marginBottom: "20px",
  };

  const searchButtonStyles = {
    backgroundColor: "#0F533D",
    color: "white",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    minWidth: "200px",
    fontSize: "16px",
    marginLeft: "500px",
  };

  const searchInputStyles = {
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "2px",
    fontSize: "16px",
    width: "300px",
    color: "#666",
  };

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

          <div className={styles.formContainer}>
            

            {/* Search Container */}
            <div style={searchContainerStyles}>
              <button
                style={searchButtonStyles}
                onClick={() => navigate("/published-exam-papers")}
              >
                Add New Bank
              </button>

              <input
                type="text"
                placeholder="Search by course unit, code or creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyles}
              />
            </div>

            <div className={styles.tableContainer}>
            <h2 style={{ marginRight: "800px" }}>QuestionBanks</h2>
              <table className={styles.questionTable}>
                <thead>
                  <tr>
                    <th>Course Unit</th>
                    <th>Unit Code</th>
                    <th>Questions</th>
                    <th>Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(filteredBanks).map(([courseUnit, banks]) =>
                    banks.map((bank) => (
                      <tr key={bank.id}>
                        <td>{bank.courseUnit}</td>
                        <td>{bank.courseUnitCode}</td>
                        <td>{bank.questionCount}</td>
                        <td>{bank.createdBy}</td>
                        <td>
                          <button onClick={() => handlePreview(bank.id)}>
                            <Eye />
                          </button>
                          <button onClick={() => generatePDF(bank)}>
                            <Download />
                          </button>
                          <button onClick={() => deleteQuestionBank(bank.id)}>
                            <Trash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
