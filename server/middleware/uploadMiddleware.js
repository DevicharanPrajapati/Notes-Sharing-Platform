import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "file") {
      cb(null, "uploads/notes/");
    } else if (file.fieldname === "thumbnail") {
      cb(null, "uploads/thumbnails/");
    }
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    cb(null, uniqueName + path.extname(file.originalname));
  },

  fileFilter: (req, file, cb) => {
    if (file.fieldname === "file") {
      if (file.mimetype === "application/pdf") {
        return cb(null, true);
      }

      return cb(new Error("Only PDF files are allowed"));
    }

    if (file.fieldname === "thumbnail") {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (allowedTypes.includes(file.mimetype)) {
        return cb(null, true);
      }

      return cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    }

    cb(new Error("Invalid file field"));
  },
});

const upload = multer({
  storage,
});

export default upload;
