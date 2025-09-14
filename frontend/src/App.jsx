import React, { useState } from "react";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ResumeUploader from "./components/ResumeUploader";
import InterviewPopup from "./components/InterviewPopup";
import axios from "axios";

function App() {
  const [jobFile, setJobFile] = useState(null);
  const [jobText, setJobText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [prepSchedule, setPrepSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInterviewPopup, setShowInterviewPopup] = useState(false);
  const [daysLeft, setDaysLeft] = useState(7);
  const [resumeGenerated, setResumeGenerated] = useState(false);

  // Utility: Validate required inputs
  const validateInputs = () => {
    if ((!jobFile && !jobText) || !resumeFile) {
      alert("Please provide Job Description (text or file) and Resume!");
      return false;
    }
    return true;
  };

  // Step 1: Generate ATS resume and download
  const handleGeneratePdf = async () => {
    if (!validateInputs()) return;

    const formData = new FormData();
    if (jobFile) formData.append("jobFile", jobFile);
    if (jobText) formData.append("jobText", jobText);
    formData.append("resumeFile", resumeFile);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/update-resume/",
        formData,
        { responseType: "blob" }
      );

      // Trigger download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "updated_resume.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setResumeGenerated(true);
  
    } catch (err) {
      console.error(err);
      alert("Error generating ATS-friendly resume!");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Show Interview Prep popup
  const handleStartInterviewPrep = () => setShowInterviewPopup(true);

  // Step 3: Confirm days and fetch preparation schedule
  const handleConfirmDaysLeft = async () => {
    if (!validateInputs()) return;

    setShowInterviewPopup(false); // Close popup immediately
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("daysLeft", daysLeft);
      if (resumeFile) formData.append("resumeFile", resumeFile);
      if (jobFile) formData.append("jobFile", jobFile);
      else if (jobText) formData.append("jobText", jobText);

      const res = await axios.post(
        "http://127.0.0.1:8000/prep-schedule/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, responseType: "text" }
      );

      setPrepSchedule(res.data);
    } catch (err) {
      console.error(err);
      alert("Error generating preparation plan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Job Prep Assistant</h1>

      {/* Step 1: Upload Job Description & Resume */}
      {!resumeGenerated && (
        <div className="bg-white shadow rounded p-6 space-y-4">
          <JobDescriptionInput
            jobText={jobText}
            setJobText={setJobText}
            jobFile={jobFile}
            setJobFile={setJobFile}
          />
          <ResumeUploader resumeFile={resumeFile} setResumeFile={setResumeFile} />
          <button
            onClick={handleGeneratePdf}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Generating PDF..." : "Analyze & Generate PDF"}
          </button>
        </div>
      )}

      {/* Step 2: Resume Generated + Interview Prep Link */}
      {resumeGenerated && !prepSchedule && (
        <div className="bg-white shadow rounded p-6 space-y-4 mt-6">
          <h2 className="text-xl font-semibold">ATS-Friendly Resume Generated & Downloaded!</h2>
          <button
            onClick={handleStartInterviewPrep}
            className="text-blue-600 underline"
          >
            Do you want interview preparation? Click here
          </button>
        </div>
      )}

      {/* Step 3: Interview Popup */}
      {showInterviewPopup && (
        <InterviewPopup
          daysLeft={daysLeft}
          setDaysLeft={setDaysLeft}
          onConfirm={handleConfirmDaysLeft}
          onCancel={() => setShowInterviewPopup(false)}
        />
      )}

      {/* Step 4: Preparation Plan */}
      {loading && !showInterviewPopup && resumeGenerated && !prepSchedule && (
        <div className="mt-6 text-center text-gray-600">
          ⏳ Generating your personalized interview schedule...
        </div>
      )}

      {prepSchedule && !showInterviewPopup && (
        <div
          className="bg-white shadow rounded p-6 mt-6"
          dangerouslySetInnerHTML={{ __html: prepSchedule }}
        />
      )}
    </div>
  );
}

export default App;
