/* models/AdminUser.js */



import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class AdminUser extends Model {}

AdminUser.init({
    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    mobile: DataTypes.STRING,
    admin_username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    createdAt: DataTypes.STRING, // Corrected field name to "createdAt"
    updatedAt: DataTypes.STRING, // Corrected field name to "updatedAt"
}, {
    sequelize,
    modelName: 'AdminUser',
    tableName: 'admin_users',
    timestamps: false,
    freezeTableName: true,
});

export default AdminUser;
