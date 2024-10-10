import React, { useState } from "react";

const ConsentCheckbox = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  return (
    <div>
      <input
        type="checkbox"
        checked={consentGiven}
        onChange={() => setConsentGiven(!consentGiven)}
      />
      <label>I agree to be monitored during the exam.</label>
    </div>
  );
};

export default ConsentCheckbox;
