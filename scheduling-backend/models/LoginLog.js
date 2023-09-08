/* models/Login_logs.js */
   

import { DataTypes } from 'sequelize'; 
import sequelize from '../database.js';

const LoginLog = sequelize.define('LoginLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    admin_username: {
        type: DataTypes.STRING,
        references: {
            model: 'admin_users', /* Reference the admin_users table */
            key: 'admin_username' /* This should match the actual column name in the table */
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    client_username: {
        type: DataTypes.STRING,
        references: {
            model: 'clients', /*/ Reference the clients table */
            key: 'client_username' /* This should match the actual column name in the table */
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_agent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    loginTimestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'login_logs',
    timestamps: false,
    freezeTableName: true
});

export default LoginLog;
