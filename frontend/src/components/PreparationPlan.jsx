import React from "react";

function PreparationPlan({ matchedKeywords, missingKeywords, interviewPlan, optimizedPdfUrl }) {
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-2xl font-bold mb-2">Matched Keywords</h2>
        <ul className="list-disc pl-5">
          {matchedKeywords.map((kw, idx) => (
            <li key={idx}>{kw}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-2xl font-bold mb-2">Missing Keywords</h2>
        <ul className="list-disc pl-5">
          {missingKeywords.map((kw, idx) => (
            <li key={idx}>{kw}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-2xl font-bold mb-2">Interview Preparation Plan</h2>
        <p>{interviewPlan}</p>
      </div>

      {optimizedPdfUrl && (
        <div className="bg-white shadow rounded p-4">
          <a
            href={optimizedPdfUrl}
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Optimized Resume PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default PreparationPlan;
