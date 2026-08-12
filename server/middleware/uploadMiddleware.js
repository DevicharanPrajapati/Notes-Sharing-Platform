import multer from "multer";

const upload = multer({
  dest: "uploads/notes/",
});

export default upload;