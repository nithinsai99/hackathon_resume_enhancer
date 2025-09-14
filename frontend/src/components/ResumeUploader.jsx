import React from "react";
import FileUploader from "./FileUploader";

export default function ResumeUploader({ resumeFile, setResumeFile }) {
  return (
    <div>
      <FileUploader
        label="Upload Resume"
        file={resumeFile}
        setFile={setResumeFile}
      />
    </div>
  );
}
