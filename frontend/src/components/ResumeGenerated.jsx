import React from "react";

const ResumeGenerated = ({ resumeUrl, onStartInterviewPrep }) => (
  <div className="bg-white shadow rounded p-6 space-y-4 mt-6">
    <h2 className="text-xl font-semibold">ATS-Friendly Resume Generated & Downloaded!</h2>
    <a href={resumeUrl} download="updated_resume.docx" className="text-blue-600 underline">
      Download Resume
    </a>
    <div className="mt-4">
      <button onClick={onStartInterviewPrep} className="text-blue-600 underline">
        Do you want interview preparation? Click here
      </button>
    </div>
  </div>
);

export default ResumeGenerated;
