/* models/Availability.js */

import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Availability = sequelize.define('Availability', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    day: { type: DataTypes.ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri'), allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
    time_zone: { type: DataTypes.STRING(50), allowNull: false },
    expiration_date_time: { type: DataTypes.DATE, allowNull: true }  // add the new field
}, {
    tableName: 'availability',
    timestamps: false,
    freezeTableName: true
});

// ... (the rest of your methods)


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

/* Update Availability by ID */
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



/* Fetch All Unexpired Availabilities */

Availability.getUnexpiredAvailabilities = async () => {
    try {
        const currentDate = new Date();
        
        return await Availability.findAll({
            where: {
                expiration_date_time: {
                    [sequelize.Op.gte]: currentDate
                }
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

export default Availability;
