/* routes/availability/index.js */

import express from 'express';
import availabilityController from '../../controllers/availability.js';
import { checkRole } from '../../authentication/auth.Roles.js';
import { authenticateToken } from '../../authentication/authMiddleware.js';

const router = express.Router();

// Removed the db import since it's not being used in this file.

// Define your routes here
router.post('/', authenticateToken, checkRole(['admin_master', 'admin_user']), availabilityController.createAvailability);
router.put('/:id', authenticateToken, checkRole(['admin_master', 'admin_user']), availabilityController.updateAvailability);
router.delete('/:id', authenticateToken, checkRole(['admin_master', 'admin_user']), availabilityController.deleteAvailability);

// Notice the URL change here
router.get('/getUnexpiredAvailabilities', availabilityController.getUnexpiredAvailabilities);

export default router;
