import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ExamPaperPreview.css";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";
import { FaEye, FaEdit, FaTrash, FaCheck, FaPaperPlane, FaUndo } from "react-icons/fa";




function ExamPaperPreview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { id } = useParams(); // Get the exam paper ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [examData, setExamData] = useState(null);
  const [isDraft, setIsDraft] = useState(true);
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}`);
        if (!response.ok) throw new Error("Failed to fetch exam paper");
        const data = await response.json();
        setExamData(data);
        setIsDraft(data.isDraft);
        setStatus(data.status);
      } catch (error) {
        setError("Error fetching exam paper: " + error.message);
      }
    };

    fetchExamData();
  }, [id]);

  const handleEdit = () => {
    if (!isDraft) {
      window.alert("You cannot edit an already published exam.");
      return; // Stop execution if the exam is published
    }
    navigate(`/exam-paper/${id}/edit`);
  };

  const handlePreviewQuestions = () => {
    navigate(`/exam-paper/${id}/questions`);
  };

  const handleDelete = async () => {
    if (!isDraft) {
      window.alert("You cannot delete an already published exam.");
      return; // Stop execution if the exam is published
    }

    if (window.confirm("Are you sure you want to delete this exam paper?")) {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorData = await response.json(); // Parse the error response
          throw new Error(errorData.message); // Use the message from the error response
        }
        setSuccess("Exam paper deleted successfully");
        navigate("/schedule-upload-exams/exam-list"); // Redirect to the exam papers list
      } catch (error) {
        setError("Error deleting exam paper: " + error.message);
      }
    }
  };

  const handlePublish = async () => {
    try {
      if (isDraft === false) {
        window.alert("This exam is already published.");
        return;
      }

      if (examData.status !== "approved") {
        window.alert("You can only publish approved assessments.");
        // setError("You can only publish approved assessments.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/exam-paper/${id}/publish`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedExamData = await response.json();
      setSuccess("Exam paper published successfully");
      setExamData(updatedExamData);
      navigate("/published-exam-papers");
    } catch (error) {
      setError("Error publishing exam paper: " + error.message);
    }
};

const handleUnpublish = async () => {
  try {
    if (isDraft) {
      window.alert("This exam is not published.");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/exam-paper/${id}/unpublish`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const updatedExamData = await response.json();
    setSuccess("Exam paper unpublished successfully");
    setExamData(updatedExamData);
    navigate("/schedule-upload-exams/exam-list");
  } catch (error) {
    setError("Error unpublishing exam paper: " + error.message);
  }
}; 


const handleRequestApproval = async () => {
  if (status === "approved") {
    window.alert("Exam is already approved.");
    return; 
  }
  if (status === "pending") {
    window.alert("Approval request has already been made.");
    return; 
  }
  try {
    const response = await fetch(
      `http://localhost:3000/exam-paper/${id}/request-approval`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "pending" }), 
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const updatedExamData = await response.json();
    setSuccess("Approval requested successfully. Status set to pending.");
    setExamData(updatedExamData); 
    navigate("/schedule-upload-exams/exam-list");
  } catch (error) {
    setError("Error requesting approval: " + error.message);
  }
};


  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!examData) return <div>Loading...</div>;

  // return (
  //   <div className="container mt-5">
  //     <h3>Exam Paper Preview</h3>
  //     <table className="table table-bordered">
  //       <tbody>
  //         <tr>
  //           <td><strong>Title</strong></td>
  //           <td>{examData.title}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Description</strong></td>
  //           <td>{examData.description}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Course ID</strong></td>
  //           <td>{examData.courseId}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Course Unit</strong></td>
  //           <td>{examData.courseUnit}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Course Unit Code</strong></td>
  //           <td>{examData.courseUnitCode}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Scheduled Date</strong></td>
  //           <td>{examData.scheduledDate}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Duration</strong></td>
  //           <td>{examData.duration}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Start Time</strong></td>
  //           <td>{examData.startTime}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>End Time</strong></td>
  //           <td>{examData.endTime}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Created By</strong></td>
  //           <td>{examData.createdBy}</td>
  //         </tr>
  //         <tr>
  //           <td><strong>Questions</strong></td>
  //           <td>{examData.questions.length} {examData.questions.length === 0 ? "(No questions added)" : ""}</td>
  //         </tr>
  //       </tbody>
  //     </table>

  //     <div className="mt-3">
  //       <button onClick={handlePreviewQuestions} className="btn btn-info mr-2">
  //         Preview Questions
  //       </button>
  //       <button onClick={handleEdit} className="btn btn-warning mr-2">
  //         Edit Exam Paper
  //       </button>
  //       <button onClick={handleDelete} className="btn btn">
  //         Delete Exam Paper
  //       </button>
  //       {examData.isDraft && (
  //         <button onClick={handlePublish} className="btn btn-success ml-2">
  //           Publish
  //         </button>
  //       )}
  //     </div>

  //     {success && <div className="alert alert-success mt-3">{success}</div>}
  //   </div>
  // );

  // return (
  //   <div className="container mt-5">
  //     <h3>Exam Paper Preview</h3>
  //     {error && <div className="alert alert-danger">{error}</div>}
  //     {success && <div className="alert alert-success">{success}</div>}

  //     <div className="table-container">
  //       <table className="table table-bordered">
  //         <tbody>
  //           <tr>
  //             <td><strong>Title</strong></td>
  //             <td>{examData.title}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Description</strong></td>
  //             <td>{examData.description}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Course ID</strong></td>
  //             <td>{examData.courseId}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Course Unit</strong></td>
  //             <td>{examData.courseUnit}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Course Unit Code</strong></td>
  //             <td>{examData.courseUnitCode}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Scheduled Date</strong></td>
  //             <td>{examData.scheduledDate}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Duration</strong></td>
  //             <td>{examData.duration}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Start Time</strong></td>
  //             <td>{examData.startTime}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>End Time</strong></td>
  //             <td>{examData.endTime}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Created By</strong></td>
  //             <td>{examData.createdBy}</td>
  //           </tr>
  //           <tr>
  //             <td><strong>Questions</strong></td>
  //             <td>{examData.questions.length} {examData.questions.length === 0 ? "(No questions added)" : ""}</td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>

  //     <div className="btn-container">
  //       <button onClick={handlePreviewQuestions} className="btn btn-info">
  //         Preview Questions
  //       </button>
  //       <button onClick={handleEdit} className="btn btn-warning">
  //         Edit Exam Paper
  //       </button>
  //       <button onClick={handleDelete} className="btn btn-danger">
  //         Delete Exam Paper
  //       </button>
  //       {examData.isDraft && (
  //         <button onClick={handlePublish} className="btn btn-success">
  //           Publish
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="exam-preview__container mt-5">
  //     <h3 className="exam-preview__title">Exam Paper Preview</h3>
  //     {error && (
  //       <div className="exam-preview__alert exam-preview__alert--danger">
  //         {error}
  //       </div>
  //     )}
  //     {success && (
  //       <div className="exam-preview__alert exam-preview__alert--success">
  //         {success}
  //       </div>
  //     )}

  //     <div className="exam-preview__table-container">
  //       <table className="exam-preview__table table-bordered">
  //         <tbody>
  //           <tr>
  //             <td>
  //               <strong>Title</strong>
  //             </td>
  //             <td>{examData.title}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Description</strong>
  //             </td>
  //             <td>{examData.description}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Course ID</strong>
  //             </td>
  //             <td>{examData.courseId}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Course Unit</strong>
  //             </td>
  //             <td>{examData.courseUnit}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Course Unit Code</strong>
  //             </td>
  //             <td>{examData.courseUnitCode}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Scheduled Date</strong>
  //             </td>
  //             <td>{examData.scheduledDate}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Duration</strong>
  //             </td>
  //             <td>{examData.duration}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Start Time</strong>
  //             </td>
  //             <td>{examData.startTime}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>End Time</strong>
  //             </td>
  //             <td>{examData.endTime}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Created By</strong>
  //             </td>
  //             <td>{examData.createdBy}</td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <strong>Questions</strong>
  //             </td>
  //             <td>
  //               {examData.questions.length}{" "}
  //               {examData.questions.length === 0 ? "(No questions added)" : ""}
  //             </td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>

  //     <div className="exam-preview__btn-container">
  //       <button
  //         onClick={handlePreviewQuestions}
  //         className="exam-preview__btn exam-preview__btn--info"
  //       >
  //         Preview Questions
  //       </button>
  //       <button
  //         onClick={handleEdit}
  //         className="exam-preview__btn exam-preview__btn--warning"
  //       >
  //         Edit Exam Paper
  //       </button>
  //       <button
  //         onClick={handleDelete}
  //         className="exam-preview__btn exam-preview__btn--danger"
  //       >
  //         Delete Exam Paper
  //       </button>
  //       {examData.isDraft && (
  //         <button
  //           onClick={handlePublish}
  //           className="exam-preview__btn exam-preview__btn--success"
  //         >
  //           Publish
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // );

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
            <BackButton targetPath="/schedule-upload-exams/exam-list" size={30} color="#106053" />
          </div>
          <div className="exam-preview__container mt-5">
            <h3 className="exam-preview__title">Exam Paper Preview</h3>
            {error && (
              <div className="exam-preview__alert exam-preview__alert--danger">
                {error}
              </div>
            )}
            {success && (
              <div className="exam-preview__alert exam-preview__alert--success">
                {success}
              </div>
            )}

            <div className="exam-preview__table-container">
              <table className="exam-preview__table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Title</strong>
                    </td>
                    <td>{examData.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Description</strong>
                    </td>
                    <td>{examData.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Course ID</strong>
                    </td>
                    <td>{examData.courseId}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Course Unit</strong>
                    </td>
                    <td>{examData.courseUnit}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Course Unit Code</strong>
                    </td>
                    <td>{examData.courseUnitCode}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Scheduled Date</strong>
                    </td>
                    <td>{examData.scheduledDate}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Duration</strong>
                    </td>
                    <td>{examData.duration}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Start Time</strong>
                    </td>
                    <td>{examData.startTime}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>End Time</strong>
                    </td>
                    <td>{examData.endTime}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Created By</strong>
                    </td>
                    <td>{examData.createdBy}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Questions</strong>
                    </td>
                    <td>
                      {examData.questions && examData.questions.length > 0
                        ? `${examData.questions.length}`
                        : "(No questions added)"}
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

            <div className="exam-preview__btn-container">
              <button onClick={handlePreviewQuestions} className="exam-preview__icon-btn" data-tooltip="Preview Questions">
                <FaEye />
              </button>
              <button onClick={handleEdit} className="exam-preview__icon-btn" data-tooltip="Edit Exam Paper">
                <FaEdit />
              </button>
              <button onClick={handleRequestApproval} className="exam-preview__icon-btn" data-tooltip="Request Approval">
                <FaCheck />
              </button>
              <button onClick={handlePublish} className="exam-preview__icon-btn" data-tooltip="Publish">
                <FaPaperPlane />
              </button>
              <button onClick={handleUnpublish} className="exam-preview__icon-btn" data-tooltip="Unpublish">
                <FaUndo />
              </button>
              <button onClick={handleDelete} className="exam-preview__delete-icon-btn" data-tooltip="Delete">
                <FaTrash />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamPaperPreview;
