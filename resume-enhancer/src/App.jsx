import { useState } from 'react';
import axios from 'axios';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) return alert("Please provide both resume and job description");

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_description', jobDescription);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/update-resume/', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'updated_resume.docx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Resume Enhancer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Resume (.pdf or .docx):</label><br />
          <input type="file" accept=".pdf,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Job Description:</label><br />
          <textarea
            rows="6"
            cols="60"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
          />
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Processing...' : 'Generate Updated Resume'}
        </button>
      </form>
    </div>
  );
}

export default App;
