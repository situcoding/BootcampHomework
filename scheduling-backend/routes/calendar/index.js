/* routes/calendar/index.js  */


const express = require('express');
const router = express.Router();
const db = require('/Users/sjsitu/UltimateScheduler/scheduling-backend/database.js'); /* replace with your own database connection */

/* GET route for /calendar/bookedSlots */
router.get('/bookedSlots', async (req, res) => {
  try {
    const bookedSlots = await db.query('SELECT date, time FROM meetings', { type: db.QueryTypes.SELECT });
    res.json(bookedSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  router.get('/availability', async (req, res) => {
    try {
      const availability = await db.query('SELECT * FROM availability', { type: db.QueryTypes.SELECT });
      res.json(availability);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }



});