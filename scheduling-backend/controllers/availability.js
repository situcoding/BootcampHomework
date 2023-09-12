/* controllers/availability.js */

import Availability from '../models/Availability.js';
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

async function getUnexpiredAvailabilities(_req, res) {
    try {
        const currentDateTime = new Date();
        const availabilities = await Availability.findAll({
            where: {
                expiration_date_time: {
                    [Op.gt]: currentDateTime
                }
            },
            attributes: ['date', 'start_time', 'end_time']
        });
        res.status(200).send(availabilities);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}



const availabilityController = {
    createAvailability,
    getAllAvailabilities,
    getAvailabilityById,
    updateAvailability,
    deleteAvailability,
    getUnexpiredAvailabilities
};






export default availabilityController;
