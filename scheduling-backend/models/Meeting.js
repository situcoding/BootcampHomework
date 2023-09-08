/* models/Meeting.js */

import { DataTypes, Model } from 'sequelize';
import db from '../database.js';

class Meeting extends Model {}

Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    time_zone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attendees: {
      type: DataTypes.TEXT,
    },
    host: {
      type: DataTypes.STRING,
    },
    co_host: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    meeting_type: {
      type: DataTypes.ENUM('I', 'E'),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    /* Your new columns go here */
    createdAt: {
      type: DataTypes.TIME,  /* replace with appropriate data type */
      /* Add constraints like allowNull, unique, etc. if necessary */
    },
    updatedAt: {
      type: DataTypes.TIME,  /* replace with appropriate data type */
      /* Add constraints like allowNull, unique, etc. if necessary */
    }
  },
  {
    sequelize: db,
    modelName: 'Meeting',
  }
);

export default Meeting;
