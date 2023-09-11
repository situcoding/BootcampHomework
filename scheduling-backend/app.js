/* app.js */


import express from 'express';
import cors from 'cors';
import db from './database.js';

/* Import routes */
import adminRoutes from './routes/admin/index.js';
import availabilityRoutes from './routes/availability/index.js';
import clientRoutes from './routes/client/index.js';
import meetingRoutes from './routes/meeting/index.js';
import usersRoutes from './routes/users.js';
import mainRoutes from './routes/index.js';
import authRoutes from './authentication/authRoutes.js';
import calendarRoutes from './routes/calendar/index.js';  // Make sure to import your calendar routes


const allowedOrigins = ['http://localhost:4200'];
const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);


/* Setup routes */
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/availability', availabilityRoutes);
app.use('/client', clientRoutes);
app.use('/meeting', meetingRoutes);
app.use('/users', usersRoutes);
app.use('/', mainRoutes);
app.use('/meeting', meetingRoutes);
app.use('/calendar', calendarRoutes);  // Fixed the typo here


/* Start the database connection and create tables */
db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return db.sync();
  })
  .then(() => {
    console.log('Database & tables created!');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/* Export the app */
export default app;
