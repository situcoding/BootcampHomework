/* models/Availability.js */

import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Availability = sequelize.define('Availability', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    day: { type: DataTypes.ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri'), allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false }
}, {
    tableName: 'availability',
    timestamps: false,
    freezeTableName: true
});

/* CRUD Operations */

/* Create Availability */
Availability.createAvailability = async (data) => {
    try {
        return await Availability.create(data);
    } catch (error) {
        throw new Error(error.message);
    }
};

/* Fetch All Availabilities */
Availability.getAllAvailabilities = async () => {
    try {
        return await Availability.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

/* Fetch Single Availability by ID */
Availability.getAvailabilityById = async (id) => {
    try {
        return await Availability.findByPk(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update Availability by ID
Availability.updateAvailability = async (id, data) => {
    try {
        await Availability.update(data, { where: { id } });
        return await Availability.getAvailabilityById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/* Delete Availability by ID */
Availability.deleteAvailability = async (id) => {
    try {
        const record = await Availability.getAvailabilityById(id);
        if (record) {
            await record.destroy();
            return record;
        }
        return null;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default Availability;
