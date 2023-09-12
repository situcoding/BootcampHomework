/* routes/calendar/index.js  */

// routes/calendar/index.js

import express from 'express';
import availabilityRoutes from '../availability/index.js';
import meetingRoutes from '../meeting/index.js';  // Import the meeting routes

const router = express.Router();

// Mount availabilityRoutes
router.use('/availability', availabilityRoutes);

// Mount meetingRoutes
router.use('/meeting', meetingRoutes);  // Mount the meeting routes

// Your existing routes
router.get('/bookedSlots', async (req, res) => {
  // ...existing logic...
});

router.get('/allUnexpired', async (req, res) => {
  // ...existing logic...
});

router.get('/getUnexpiredAvailabilities', (req, res, next) => {
  req.url = '/getUnexpiredAvailabilities';
  availabilityRoutes.handle(req, res, next); 
});

router.get('/getBookedSlots', (req, res, next) => {
  req.url = '/getBookedSlots';  // Modify the URL as needed
  meetingRoutes.handle(req, res, next);  // Forward the request to the meeting router
});

export default router;
