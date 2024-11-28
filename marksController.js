import xlsx from "xlsx";
import Student from "../models/Student.js";

export const uploadMarks = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const { category } = req.params;
  const validCategories = [
    "attendance",
    "projectReview",
    "assessment",
    "projectSubmission",
    "linkedinPost",
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: "Invalid category." });
  }

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (let row of data) {
      const student = await Student.findOne({ studentId: row.studentId });
      if (student) {
        student[`${category}Marks`] = row.marks;
        await student.save();
      } else {
        await Student.create({
          studentId: row.studentId,
          name: row.name,
          [`${category}Marks`]: row.marks,
        });
      }
    }

    res.status(200).json({ message: "Marks uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing file", error: error.message });
  }
};

export const getStudentResults = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      studentId: student.studentId,
      name: student.name,
      attendanceMarks: student.attendanceMarks,
      projectReviewMarks: student.projectReviewMarks,
      assessmentMarks: student.assessmentMarks,
      projectSubmissionMarks: student.projectSubmissionMarks,
      linkedinPostMarks: student.linkedinPostMarks,
      totalMarks: student.totalMarks,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving student results",
        error: error.message,
      });
  }
};
