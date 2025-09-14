import React from "react";

function FileUploader({ label, file, setFile }) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded w-full"
      />
      {file && <p className="mt-1 text-gray-600">{file.name}</p>}
    </div>
  );
}

export default FileUploader;
