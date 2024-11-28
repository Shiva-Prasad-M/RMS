import express from "express";
import multer from "multer";
import {
  getStudentResults,
  uploadMarks,
} from "../controllers/marksController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/:category", upload.single("file"), uploadMarks);
router.get("/results/:studentId", getStudentResults);

export default router;
