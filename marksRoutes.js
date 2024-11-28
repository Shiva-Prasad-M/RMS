import express from "express";
import auth from "../middleware/auth.js";
import Student from "../models/Student.js";

const router = express.Router();

router.post("/upload", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Only admins can upload marks" });
  }

  try {
    const { studentId, name, category, marks } = req.body;
    let student = await Student.findOne({ studentId });

    if (!student) {
      student = new Student({ studentId, name });
    }

    student[`${category}Marks`] = marks;
    await student.save();

    res.status(200).send({ message: "Marks uploaded successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/results/:studentId", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
