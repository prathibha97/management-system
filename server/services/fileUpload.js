const multer = require('multer');
// Set up multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'idCardPath') {
      cb(null, 'uploads/idCards');
    } else if (file.fieldname === 'bankPassPath') {
      cb(null, 'uploads/bankPasses');
    } else if (file.fieldname === 'resumePath') {
      cb(null, 'uploads/resumes');
    } else {
      cb(null, 'uploads');
    }
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Set up multer upload
const upload = multer({ storage });

module.exports = upload;
