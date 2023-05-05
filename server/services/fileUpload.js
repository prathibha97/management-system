// /* eslint-disable import/no-extraneous-dependencies */
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     if (file.fieldname === 'idCardPath') {
//       cb(null, 'uploads/idCards');
//     } else if (file.fieldname === 'bankPassPath') {
//       cb(null, 'uploads/bankPasses');
//     } else if (file.fieldname === 'resumePath') {
//       cb(null, 'uploads/resumes');
//     } else if (file.fieldname === 'projectScope') {
//       cb(null, 'uploads/projectScopes');
//     }
//      else {
//       cb(null, 'uploads');
//     }
//   },
//   filename(req, file, cb) {
//     const { firstName, lastName, title } = req.body;
//     const sanitizedFirstName = firstName?.replace(/\s+/g, '_');
//     const sanitizedLastName = lastName?.replace(/\s+/g, '_');
//     const sanitizedTitle = title?.replace(/\s+/g, '_');
//     cb(null, `${sanitizedFirstName}_${sanitizedLastName}_${file.originalname}` || `${sanitizedTitle}_${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
//   // limits: { fileSize: 50 * 1024 * 1024 }, // 50 megabytes
// });

// module.exports = upload;

/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'idCardPath') {
      cb(null, 'uploads/idCards');
    } else if (file.fieldname === 'bankPassPath') {
      cb(null, 'uploads/bankPasses');
    } else if (file.fieldname === 'resumePath') {
      cb(null, 'uploads/resumes');
    } else if (file.fieldname === 'projectScope') {
      cb(null, 'uploads/projectScopes');
    } else {
      cb(null, 'uploads');
    }
  },
  filename(req, file, cb) {
    if (file.fieldname === 'projectScope') {
      cb(null, `${file.originalname}`);
    } else {
      const { firstName, lastName, title } = req.body;
      const sanitizedFirstName = firstName?.replace(/\s+/g, '_');
      const sanitizedLastName = lastName?.replace(/\s+/g, '_');
      const sanitizedTitle = title?.replace(/\s+/g, '_');
      cb(null, `${sanitizedFirstName}_${sanitizedLastName}_${file.originalname}` || `${sanitizedTitle}_${file.originalname}`);
    }
  },
});

const upload = multer({
  storage,
  // limits: { fileSize: 50 * 1024 * 1024 }, // 50 megabytes
});

module.exports = upload;
