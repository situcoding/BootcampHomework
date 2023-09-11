/* routes/calendar/index.js  */


import express from 'express';
import availabilityRoutes from '../availability/index.js';

const router = express.Router();

// Mount availabilityRoutes
router.use('/availability', availabilityRoutes);

// Your existing routes
router.get('/bookedSlots', async (req, res) => {
  // ...existing logic...
});

router.get('/allUnexpired', async (req, res) => {
  // ...existing logic...
});


router.get('/getUnexpiredAvailabilities', (req, res, next) => {
  req.url = '/getUnexpiredAvailabilities'; // Modify the URL as needed
  availabilityRoutes.handle(req, res, next); // Forward the request to the availability router
});


export default router;
