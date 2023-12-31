/*  controllers/meeting.js */


import Sequelize from 'sequelize';  /* Import Sequelize */
import Meeting from '../models/Meeting.js';  /* Import Sequelize model */

// Get all unexpired meetings with pagination and sorting
export async function getAllMeetings(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;  /* number of records per page */
    const offset = parseInt(req.query.offset) || 0; /* offset */
    const sort = req.query.sort || 'date';
    const order = req.query.order || 'ASC';

    const currentDate = new Date();

    const meetings = await Meeting.findAll({
      where: {
        expiration_date_time: {
          [Sequelize.Op.gte]: currentDate
        }
      },
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

/* Get unexpired booked slots */
export async function getBookedSlots(req, res) {
  try {
    const currentDate = new Date();

    const bookedSlots = await Meeting.findAll({
      where: {
        expiration_date_time: {
          [Sequelize.Op.gte]: currentDate
        }
      },
      attributes: ['date', 'start_time', 'end_time']
    });

    res.status(200).json(bookedSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
