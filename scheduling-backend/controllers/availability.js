/* controllers/availability.js */

import Availability from '../models/Availability.js';
import Meeting from '../models/Meeting.js';
import {Op} from 'sequelize';

/* Create a new availability  */
async function createAvailability(req, res) {
    try {
        const availability = await Availability.create(req.body);
        res.status(201).send(availability);
    } catch (error) {
        res.status(400).send(error);
    }
}

/* Get all availabilities */
async function getAllAvailabilities(_req, res) {
    try {
        const availabilities = await Availability.findAll();
        res.status(200).send(availabilities);
    } catch (error) {
        res.status(500).send(error);
    }
}

/* Get a single availability by ID */
async function getAvailabilityById(req, res) {
    try {
        const availability = await Availability.findByPk(req.params.id);
        if (!availability) {
            return res.status(404).send({ message: 'Availability not found' });
        }
        res.status(200).send(availability);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update an availability by ID
async function updateAvailability(req, res) {
    try {
        const [numberOfAffectedRows, affectedRows] = await Availability.update(req.body, {
            where: { id: req.params.id },
            returning: true // needed for affectedRows to be populated
        });

        if (numberOfAffectedRows === 0) {
            return res.status(404).send({ message: 'Availability not found' });
        }

        res.status(200).send(affectedRows[0]);
    } catch (error) {
        res.status(400).send({ message: 'Invalid request', error });
    }
}


/* Delete an availability by ID */
async function deleteAvailability(req, res) {
    try {
        const availability = await Availability.destroy({
            where: { id: req.params.id },
        });

        if (!availability) {
            return res.status(404).send({ message: 'Availability not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
}
/* Get all unexpired availabilities */

async function getTrueAvailabilities(_req, res) {
    try {
        const currentDateTime = new Date();
        const trueAvailabilities = [];

        const availabilities = await Availability.findAll({
            where: {
                expiration_date_time: {
                    [Op.gt]: currentDateTime
                }
            },
            attributes: ['date', 'start_time', 'end_time']
        });

        const meetings = await Meeting.findAll({
            where: {
                date: {
                    [Op.gte]: currentDateTime
                }
            },
            attributes: ['date', 'start_time', 'end_time']
        });

        availabilities.forEach(avail => {
            let conflictingMeetings = meetings.filter(meet => {
                return new Date(avail.date).getTime() === new Date(meet.date).getTime() &&
                    avail.start_time < meet.end_time &&
                    avail.end_time > meet.start_time;
            });

            if (conflictingMeetings.length === 0) {
                trueAvailabilities.push(avail);
            } else {
                let currentStart = avail.start_time;
                conflictingMeetings.sort((a, b) => a.start_time - b.start_time);  // Sort meetings by start time
                
                conflictingMeetings.forEach(meet => {
                    if (currentStart < meet.start_time) {
                        trueAvailabilities.push({
                            date: avail.date,
                            start_time: currentStart,
                            end_time: meet.start_time
                        });
                    }
                    currentStart = Math.max(currentStart, meet.end_time);
                });

                if (currentStart < avail.end_time) {
                    trueAvailabilities.push({
                        date: avail.date,
                        start_time: currentStart,
                        end_time: avail.end_time
                    });
                }
            }
        });

        res.status(200).send(trueAvailabilities);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while fetching availabilities." });
    }
}



const availabilityController = {
    createAvailability,
    getAllAvailabilities,
    getAvailabilityById,
    updateAvailability,
    deleteAvailability,
    getTrueAvailabilities
    
};






export default availabilityController;
