import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExamInstructions.css";
import { ExamDetails } from "../../components/student/ExamDetails";
const ExamInstructions = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/proctoring");
  };

  return (
    <div className="instructions-overall">
      <div className="examination-details">
        <ExamDetails />
      </div>
      <div className="instructions-page">
        <h2>EXAM INSTRUCTIONS</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum quos
          quam veniam odio inventore omnis consequatur cum distinctio
          recusandae. Architecto at ex quos? Tenetur, cupiditate voluptatibus
          nisi expedita reiciendis fugiat.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          minus consectetur aspernatur vero assumenda totam quisquam libero,
          fugit inventore animi unde ipsa deserunt at deleniti veniam, natus
          commodi cum officia.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          ipsa id cupiditate totam provident consectetur, unde nobis tempora
          officiis. Consequatur a eius, velit obcaecati aut itaque vero
          laboriosam debitis pariatur.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
          libero officia velit! Et deleniti, numquam inventore, quos dicta optio
          soluta consectetur, beatae id nesciunt alias dolorum eveniet sequi
          voluptatibus recusandae!
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          dolore est quo omnis voluptatum modi quisquam obcaecati sit? Minus
          tenetur, autem minima nostrum ratione error? Voluptatem amet at quo
          eius.
        </p>
        <button className="next-button" onClick={handleNext}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default ExamInstructions;
