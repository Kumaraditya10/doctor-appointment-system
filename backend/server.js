import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // frontend ka exact URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Health check
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Debug: test route to check if data is sending
app.get('/api/test', (req, res) => {
  console.log("Test route hit");
  res.json({ success: true, message: "Data from backend" });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
