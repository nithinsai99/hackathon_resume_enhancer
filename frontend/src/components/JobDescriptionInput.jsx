import React from "react";
import FileUploader from "./FileUploader";


export default function JobDescriptionInput({ jobText, setJobText, jobFile, setJobFile }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">Job Description (Text)</label>
      <textarea
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        rows={5}
        placeholder="Paste your job description here"
      />
      <p className="text-sm text-gray-500">Or upload a file:</p>
      <FileUploader
        label="Upload Job Description File"
        file={jobFile}
        setFile={setJobFile}
      />
    </div>
  );
}
