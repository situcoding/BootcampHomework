/* controllers/availability.js */

import Availability from '../models/Availability.js';

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
async function getAllAvailabilities(req, res) {
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
        const availability = await Availability.update(req.body, {
            where: { id: req.params.id },
        });

        if (!availability) {
            return res.status(404).send({ message: 'Availability not found' });
        }

        res.status(200).send(availability);
    } catch (error) {
        res.status(400).send(error);
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

const availabilityController = {
    createAvailability,
    getAllAvailabilities,
    getAvailabilityById,
    updateAvailability,
    deleteAvailability
};

export default availabilityController;
