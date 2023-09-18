/* routes/admin/index.js */

import express from 'express';
import { registerAdmin, getAllAdminUsers, loginAdmin } from '../../controllers/admin.js';

const router = express.Router();

// Middleware function for JWT token validation (you need to implement this)
function validateToken(req, res, next) {
  // Implement token validation logic here and set user information in the request object if valid.
  // If the token is invalid, return an unauthorized response.
  next();
}

// Register a new admin
router.post('/admin-register', (req, res) => {
  console.log("Entered POST /admin/admin-register");
  registerAdmin(req, res);
});

// Get all admin users (accessible only by Admin_Master)
router.get('/admin-all', validateToken, (req, res) => {
  console.log("Entered GET /admin/admin-all");
  getAllAdminUsers(req, res);
});

// Admin login route (with token validation middleware)
router.post('/admin-login', async (req, res) => {
  console.log("Entered POST /admin/admin-login");
  loginAdmin(req, res);
});

export default router;
