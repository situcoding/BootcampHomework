/*  controllers/meeting.js */

import Meeting from '../models/Meeting.js';  /* Import Sequelize model */

// Get all meetings with pagination and sorting
export async function getAllMeetings(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;  /* number of records per page */
    const offset = parseInt(req.query.offset) || 0; /* offset */
    const sort = req.query.sort || 'date';
    const order = req.query.order || 'ASC';

    const meetings = await Meeting.findAll({
      limit,
      offset,
      order: [[sort, order]]
    });

    res.status(200).json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
}


/* Get booked slots */
export async function getBookedSlots(req, res) {
  try {
    const [rows] = await query('SELECT date, time FROM meetings');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


