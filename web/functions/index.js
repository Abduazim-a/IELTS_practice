const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require("docx");

admin.initializeApp();

// Register device and enforce device limit
exports.registerDevice = onRequest(async (req, res) => {
  try {
    const { phoneNumber, deviceId } = req.body;
    
    if (!phoneNumber || !deviceId) {
      return res.status(400).json({ error: "Phone number and device ID required" });
    }

    const userRef = admin.firestore().doc(`users/${phoneNumber}`);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const devices = userData.devices || [];

    // Check if device already registered
    if (devices.includes(deviceId)) {
      return res.status(200).json({ success: true, message: "Device already registered" });
    }

    // Check device limit
    if (devices.length >= 3) {
      return res.status(403).json({ error: "Device limit reached" });
    }

    // Add device
    await userRef.update({
      devices: admin.firestore.FieldValue.arrayUnion(deviceId),
      deviceCount: devices.length + 1,
      lastLogin: admin.firestore.Timestamp.now()
    });

    res.status(200).json({ success: true, message: "Device registered successfully" });
  } catch (error) {
    console.error("Device registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Submit test result
exports.submitTestResult = onRequest(async (req, res) => {
  try {
    const { phoneNumber, testData } = req.body;
    
    if (!phoneNumber || !testData) {
      return res.status(400).json({ error: "Phone number and test data required" });
    }

    // Save to test history
    const historyRef = admin.firestore().collection('testHistory').doc();
    await historyRef.set({
      phoneNumber,
      ...testData,
      submittedAt: admin.firestore.Timestamp.now()
    });

    // Update user stats
    const userRef = admin.firestore().doc(`users/${phoneNumber}`);
    await userRef.update({
      lastTestDate: admin.firestore.Timestamp.now(),
      totalTests: admin.firestore.FieldValue.increment(1)
    });

    res.status(200).json({ success: true, message: "Test result saved" });
  } catch (error) {
    console.error("Test submission error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Generate and upload writing submission document
exports.onWritingSubmit = onDocumentWritten("writingSubmissions/{docId}", async (event) => {
  try {
    const submissionData = event.data.after.data();
    
    if (!submissionData) {
      console.log("No submission data found");
      return;
    }

    // Generate document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "IELTS Writing Submission",
            heading: HeadingLevel.HEADING_1,
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Student Information",
                bold: true,
              })
            ]
          }),
          new Paragraph({
            text: `Name: ${submissionData.studentName || 'N/A'}`
          }),
          new Paragraph({
            text: `Phone: ${submissionData.phoneNumber}`
          }),
          new Paragraph({
            text: `Submitted: ${submissionData.submittedAt.toDate().toLocaleString()}`
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Writing Prompt",
                bold: true,
              })
            ]
          }),
          new Paragraph({
            text: submissionData.prompt
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Student Response",
                bold: true,
              })
            ]
          }),
          new Paragraph({
            text: submissionData.answer
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Word Count: ${submissionData.wordCount} words`,
                italics: true,
              })
            ]
          })
        ]
      }]
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);

    // Upload to Firebase Storage
    const bucket = admin.storage().bucket();
    const fileName = `writing-submissions/${submissionData.phoneNumber}/${event.params.docId}.docx`;
    const file = bucket.file(fileName);

    await file.save(buffer, {
      metadata: {
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    });

    // Update submission with download URL
    const [downloadURL] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500' // Long expiry for teacher access
    });

    await admin.firestore().doc(`writingSubmissions/${event.params.docId}`).update({
      documentURL: downloadURL,
      documentGenerated: true,
      generatedAt: admin.firestore.Timestamp.now()
    });

    console.log(`Document generated for submission ${event.params.docId}`);
  } catch (error) {
    console.error("Document generation error:", error);
  }
});