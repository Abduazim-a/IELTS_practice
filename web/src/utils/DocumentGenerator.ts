import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

interface WritingSubmission {
  prompt: string;
  studentAnswer: string;
  studentInfo: {
    name: string;
    phoneNumber: string;
  };
  testInfo: {
    section: string;
    testId: string;
    submittedAt: Date;
  };
}

export const generateWritingDocument = async (submission: WritingSubmission): Promise<Blob> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          text: "IELTS Writing Submission",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 300 }
        }),

        // Student Information
        new Paragraph({
          children: [
            new TextRun({
              text: "Student Information",
              bold: true,
              size: 24
            })
          ],
          spacing: { before: 200, after: 200 }
        }),
        new Paragraph({
          children: [
            new TextRun(`Name: ${submission.studentInfo.name}`),
            new TextRun(`\nPhone: ${submission.studentInfo.phoneNumber}`),
            new TextRun(`\nSubmitted: ${submission.testInfo.submittedAt.toLocaleString()}`)
          ],
          spacing: { after: 300 }
        }),

        // Test Information
        new Paragraph({
          children: [
            new TextRun({
              text: "Test Information",
              bold: true,
              size: 24
            })
          ],
          spacing: { before: 200, after: 200 }
        }),
        new Paragraph({
          children: [
            new TextRun(`Section: ${submission.testInfo.section.toUpperCase()}`),
            new TextRun(`\nTest ID: ${submission.testInfo.testId}`)
          ],
          spacing: { after: 300 }
        }),

        // Prompt
        new Paragraph({
          children: [
            new TextRun({
              text: "Writing Prompt",
              bold: true,
              size: 24
            })
          ],
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: submission.prompt,
          spacing: { after: 400 }
        }),

        // Student Answer
        new Paragraph({
          children: [
            new TextRun({
              text: "Student Response",
              bold: true,
              size: 24
            })
          ],
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: submission.studentAnswer,
          spacing: { after: 200 }
        }),

        // Word Count
        new Paragraph({
          children: [
            new TextRun({
              text: `Word Count: ${submission.studentAnswer.split(/\s+/).filter(word => word.length > 0).length} words`,
              italics: true,
              size: 20
            })
          ],
          spacing: { before: 200 }
        })
      ]
    }]
  });

  return await Packer.toBlob(doc);
};

export const downloadDocument = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};