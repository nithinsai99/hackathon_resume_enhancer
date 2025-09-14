import io
import os
import google.generativeai as genai
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from docx import Document
from PyPDF2 import PdfReader

genai.configure(api_key="YOUR_API_KEY")

@csrf_exempt
def resume_update_view(request):
    if request.method == 'POST':
        resume_file = request.FILES.get('resume')
        job_description = request.POST.get('job_description')

        if not resume_file or not job_description:
            return HttpResponse("Missing resume or job description", status=400)

        filename = resume_file.name
        ext = os.path.splitext(filename)[1].lower()

        # Extract resume text based on file type
        try:
            if ext == '.docx':
                doc = Document(resume_file)
                resume_text = "\n".join([para.text for para in doc.paragraphs])
            elif ext == '.pdf':
                reader = PdfReader(resume_file)
                resume_text = "\n".join([page.extract_text() or "" for page in reader.pages])
            else:
                return HttpResponse("Only .docx and .pdf files are supported.", status=400)
        except Exception as e:
            return HttpResponse(f"Error reading resume file: {str(e)}", status=500)

        # Gemini prompt
        prompt = f"""
        You are a resume optimization assistant. Here's the original resume:
        {resume_text}

        Here's the job description:
        {job_description}

        Please rewrite the resume to better align with the job description. Focus on:
        - Highlighting relevant skills and achievements
        - Using action-oriented language
        - Integrating keywords naturally
        - Keeping the format professional

        Return only the updated resume text.
        """

        try:
            model = genai.GenerativeModel("gemini-2.5-flash")
            response = model.generate_content(prompt)
            updated_text = response.text
        except Exception as e:
            return HttpResponse(f"Gemini API error: {str(e)}", status=500)

        # Create updated DOCX
        updated_doc = Document()
        updated_doc.add_heading('Updated Resume', 0)
        for line in updated_text.split('\n'):
            updated_doc.add_paragraph(line)

        buffer = io.BytesIO()
        updated_doc.save(buffer)
        buffer.seek(0)

        return HttpResponse(
            buffer.read(),
            content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            headers={'Content-Disposition': 'attachment; filename=updated_resume.docx'}
        )

    return HttpResponse("Only POST method is allowed", status=405)

