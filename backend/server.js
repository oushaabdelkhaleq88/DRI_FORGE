require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_PATH = process.env.UPLOAD_PATH || './uploads';

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH);
}

// CORS setup
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://yourdomain.com'], // Adjust as needed for your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    // Sanitize filename and add timestamp for uniqueness
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const timestamp = Date.now();
    cb(null, `${timestamp}_${sanitizedFilename}`);
  }
});

// Multer file filter for .js files and size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit, reinstated after debugging
  fileFilter: (req, file, cb) => {
    const filetypes = /javascript/;
    const extnameAllowed = /\.js$/;

    const mimetypeMatches = filetypes.test(file.mimetype);
    const extnameMatches = extnameAllowed.test(path.extname(file.originalname).toLowerCase());

    console.log(`Multer File Filter: File MIME Type: ${file.mimetype}, Extension: ${path.extname(file.originalname).toLowerCase()}`);
    console.log(`Multer File Filter: MIME Type Test Result: ${mimetypeMatches}, Extension Test Result: ${extnameMatches}`);

    if (mimetypeMatches && extnameMatches) {
      return cb(null, true);
    }
    cb(new Error('Only .js files (application/javascript) are allowed and file size must be under 5MB!'));
  }
}).single('file'); // 'file' is the field name for the uploaded file

// API Endpoints

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// File Upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Upload Error from Multer:', err);
      console.error('Upload Error Message:', err.message);
      return res.status(400).json({ status: 'error', message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded.' });
    }

    // Read the uploaded .js file to extract the systemInfo JSON
    const filePath = req.file.path;
    fs.readFile(filePath, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error('Error reading uploaded file:', readErr);
        return res.status(500).json({ status: 'error', message: 'Failed to read uploaded file.' });
      }

      let systemInfo = {};
      try {
        systemInfo = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing systemInfo from .js file (pure JSON expected):', parseErr);
        return res.status(500).json({ status: 'error', message: 'Failed to parse system info from file. Ensure it\'s pure JSON.' });
      }

      console.log(`File uploaded: ${req.file.filename} from IP: ${req.ip}, User-Agent: ${req.headers['user-agent']}`);
      res.json({ status: 'success', filename: req.file.filename, systemInfo: systemInfo });
    });
  });
});

// Bonus: POST /upload-json endpoint (accepts raw JSON)
app.post('/upload-json', (req, res) => {
  if (!req.is('application/json')) {
    return res.status(400).json({ status: 'error', message: 'Content-Type must be application/json.' });
  }

  const jsonData = req.body;
  if (!jsonData || Object.keys(jsonData).length === 0) {
    return res.status(400).json({ status: 'error', message: 'No JSON data provided.' });
  }

  const timestamp = Date.now();
  const filename = `json_${timestamp}.json`;
  const filePath = path.join(UPLOAD_PATH, filename);

  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('JSON Upload Error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to save JSON data.' });
    }
    console.log(`JSON data uploaded: ${filename} from IP: ${req.ip}, User-Agent: ${req.headers['user-agent']}`);
    res.json({ status: 'success', filename: filename });
  });
});

// New Endpoint: Get uploaded file content by filename
app.get('/uploaded-info/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOAD_PATH, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ status: 'error', message: 'File not found.' });
  }

  fs.readFile(filePath, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error('Error reading file for display:', readErr);
      return res.status(500).json({ status: 'error', message: 'Failed to read file content.' });
    }

    let systemInfo = {};
    try {
      systemInfo = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing systemInfo from file for display:', parseErr);
      return res.status(500).json({ status: 'error', message: 'Failed to parse system info from file.' });
    }

    res.json({ status: 'success', systemInfo: systemInfo });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Uploads path: ${path.resolve(UPLOAD_PATH)}`);
});
