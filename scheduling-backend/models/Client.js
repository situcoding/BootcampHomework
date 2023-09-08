
/* models/Client.js */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class Client extends Model {}

Client.init({
    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobile: DataTypes.STRING,
    company_school: DataTypes.STRING,
    client_username: DataTypes.STRING,
    password: DataTypes.STRING,  /* Note: This should be hashed before being stored.*/
    /* ... Add any other fields as needed...*/
}, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',  /* Specify your existing table name here*/
    timestamps: false,  /* Only add this if your table doesn't have `createdAt` and `updatedAt` fields*/
    freezeTableName: true  /* This ensures Sequ*/
});


export default Client;
