/* routes/meeting/index.js  */


import express from 'express';
import Meeting from '../../models/Meeting.js';
import { Op } from 'sequelize';
const router = express.Router();

/* Book a meeting */
router.post('/book', async (req, res) => {
  try {
    const meeting = await Meeting.create(req.body);
    res.status(201).json({ success: true, data: meeting });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

/* Edit a meeting */
router.put('/edit/:id', async (req, res) => {
  try {
    const meeting = await Meeting.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

/* Get a single meeting */
router.get('/view/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});


/* Get upcoming meetings by client_username */
router.get('/upcoming', async (req, res) => {
  console.log('Upcoming meeting route triggered');

  try {
    const clientUsername = req.query.client_username;

    // Validate client_username
    if (!clientUsername) {
      return res.status(400).json({ success: false, error: "client_username is required" });
    }

    const meetings = await Meeting.findAll({
      attributes: ['id', 'date', 'start_time', 'end_time', 'time_zone', 'location', 'subject'],
      where: {
        client_username: clientUsername,
        date: {
          [Op.gte]: new Date()
        }
      },
      order: [
        ['date', 'ASC'],
        ['start_time', 'ASC']
      ]
    });
    res.status(200).json({ success: true, data: meetings });
  } catch (error) {
    console.error("Error getting upcoming meetings:", error);
    res.status(400).json({ success: false, error });
  }
});


/* Add more routes as needed */

export default router;
