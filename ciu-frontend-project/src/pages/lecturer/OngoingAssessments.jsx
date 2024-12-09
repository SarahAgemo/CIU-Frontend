import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExampaperList.css";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";
import { FiEye } from "react-icons/fi";

function OngoingAssessments() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [examPapers, setExamPapers] = useState([]);
    const [filteredExamPapers, setFilteredExamPapers] = useState([]);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchError, setSearchError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const fetchExamPapers = async () => {
            try {
                const response = await fetch("http://localhost:3000/exam-paper");
                if (!response.ok) throw new Error("Failed to fetch exam papers");
                const data = await response.json();
                setExamPapers(data);
                setFilteredExamPapers(data);
            } catch (error) {
                setError("Error fetching exam papers: " + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExamPapers();
    }, []);

    useEffect(() => {
        // Define valid status terms
        const validStatusTerms = [
            'draft',
            'published',
            'pending',
            'approved',
            'rejected',
            'unpublished'
        ];

        // Clear any previous search error
        setSearchError("");

        // If search term is empty, show all papers
        if (!searchTerm) {
            setFilteredExamPapers(examPapers);
            return;
        }

        // Check if search term matches any valid status
        const searchLower = searchTerm.toLowerCase();
        const isValidStatusSearch = validStatusTerms.some(status =>
            status.includes(searchLower)
        );

        if (!isValidStatusSearch) {
            setSearchError("Please search by status (draft, published, pending, approved, rejected, unpublished)");
            setFilteredExamPapers(examPapers); // Keep showing all papers
            return;
        }

        // If valid status search, filter the papers
        const filtered = examPapers.filter((exam) =>
            (exam.isDraft ? "draft" : "published").toLowerCase().includes(searchLower) ||
            (exam.status || "").toLowerCase().includes(searchLower)
        );
        setFilteredExamPapers(filtered);
    }, [searchTerm, examPapers]);

    const handlePreview = (examId) => {
        navigate(`/exam-paper/${examId}`);
    };

    const searchContainerStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 0",
        gap: "0px"
    };

    const searchButtonStyles = {
        backgroundColor: "#0F533D",
        color: "white",
        padding: "12px 24px",
        border: "none",
        cursor: "pointer",
        minWidth: "200px",
        fontSize: "16px",
        marginLeft: "500px"
    };

    const searchInputStyles = {
        padding: "12px 16px",
        border: "1px solid #ddd",
        borderRadius: "2px",
        fontSize: "16px",
        width: "300px",
        color: "#666"
    };

    const errorMessageStyles = {
        color: '#ff4444',
        fontSize: '14px',
        marginTop: '5px',
        position: 'absolute',
        top: '100%'
    };

    if (error) {
        return <div className="E-alert alert-danger">{error}</div>;
    }

    return (
        <div className={Dash.lecturerDashboard}>
            <div className={Dash.dashboard}>
                <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
                <div className={Dash["dashboard-content"]}>
                    {!isMobile && <Sidebar />}
                    {isMobile && (
                        <MobileMenu
                            isOpen={isMobileMenuOpen}
                            toggleMenu={toggleMobileMenu}
                        />
                    )}
                    <div className={Dash.backButtonContainer}>
                        <BackButton targetPath="/lecturerdashboard" size={30} color="#106053" />
                    </div>
                    <div className="E-exam-list-container">
                        <div className="search-container">
                            <div style={searchContainerStyles}>
                                <button
                                    style={searchButtonStyles}
                                    onClick={() => navigate('/schedule-upload-exams/exam-list')}
                                >
                                    View Exam Paper
                                </button>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="Search by exam status..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={searchInputStyles}
                                    />
                                    {searchError && (
                                        <div style={errorMessageStyles}>
                                            {searchError}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <h2 style={{ marginRight: "700px" }}>Ongoing Assessments</h2>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : filteredExamPapers.length === 0 ? (
                            <div>No exam papers found matching your search.</div>
                        ) : (
                            <table className="E-glass-table">
                                <thead>
                                    <tr>
                                        <th>Course Unit</th>
                                        <th>Title</th>
                                        <th>Instructions</th>
                                        <th>Status</th>
                                        <th>Phase</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredExamPapers.map((exam) => (
                                        <tr key={exam.id}>
                                            <td>{exam.courseUnit}</td>
                                            <td>{exam.title}</td>
                                            <td>{exam.description}</td>
                                            <td>
                                                <span
                                                    className={`E-status-text ${exam.isDraft ? "draft" : "published"
                                                        }`}
                                                >
                                                    {exam.isDraft ? "Draft" : "Published"}
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`E-status-text ${exam.status === "draft"
                                                        ? "draft"
                                                        : exam.status === "pending"
                                                            ? "pending"
                                                            : exam.status === "approved"
                                                                ? "approved"
                                                                : exam.status === "rejected"
                                                                    ? "rejected"
                                                                    : exam.status === "published"
                                                                        ? "published"
                                                                        : exam.status === "unpublished"
                                                                            ? "unpublished"
                                                                            : ""
                                                        }`}
                                                >
                                                    {exam.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="E-preview-button"
                                                    onClick={() => handlePreview(exam.id)}
                                                >
                                                    <FiEye />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OngoingAssessments;