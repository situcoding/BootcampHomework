/* routes/availability/index.js */


import express from 'express';
import availabilityController from '../../controllers/availability.js';
import db from '/Users/sjsitu/UltimateScheduler/scheduling-backend/database.js';


const router = express.Router();

/* Create a new availability */
router.post('/', availabilityController.createAvailability);

/* Get all availabilities */
router.get('/getAvailability', async (req, res) => {
    try {
      const availability = await db.query('SELECT * FROM availability', { type: db.QueryTypes.SELECT });
      res.json(availability);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


/* Get a single availability by ID */
router.get('/:id', availabilityController.getAvailabilityById);

/* Update an availability by ID */
router.put('/:id', availabilityController.updateAvailability);

/* Delete an availability by ID */
router.delete('/:id', availabilityController.deleteAvailability);

export default router;
