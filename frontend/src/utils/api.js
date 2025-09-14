import axios from "axios";

// Generate ATS resume
export const generateResume = async (jobFile, jobText, resumeFile) => {
  const formData = new FormData();
  if (jobFile) formData.append("jobFile", jobFile);
  if (jobText) formData.append("jobText", jobText);
  formData.append("resumeFile", resumeFile);

  const res = await axios.post("http://127.0.0.1:8000/update-resume/", formData, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "updated_resume.docx");
  document.body.appendChild(link);
  link.click();
  link.remove();

  return url;
};

// Generate interview preparation schedule
export const generatePrepSchedule = async (jobFile, jobText, resumeFile, daysLeft) => {
  const formData = new FormData();
  formData.append("daysLeft", daysLeft);
  if (resumeFile) formData.append("resumeFile", resumeFile);
  if (jobFile) formData.append("jobFile", jobFile);
  else if (jobText) formData.append("jobText", jobText);

  const res = await axios.post("http://127.0.0.1:8000/prep-schedule/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: "text",
  });

  return res.data;
};
