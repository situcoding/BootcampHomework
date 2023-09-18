/* controllers/admin.js */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import LoginLog from '../models/LoginLog.js';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;



export async function registerAdmin(req, res) {
  try {
    const { 
      first_name,
      middle_name,
      last_name,
      birthday,
      gender,
      mobile,
      role,
      email,
      admin_username,
      password
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdminUser = await AdminUser.create({
      first_name,
      middle_name,
      last_name,
      birthday,
      gender,
      mobile,
      role,
      email,
      admin_username,
      password: hashedPassword, // Pass the hashed password here
    });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




/* Function to get all admin users (accessible only by Admin_Master) */
export async function getAllAdminUsers(req, res) {
try {
const adminUsername = req.admin_username;

    const adminUser = await AdminUser.findOne({ where: { admin_username: adminUsername } });

    if (!adminUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (adminUser.role !== 'admin_master') {
        return res.status(403).json({ message: 'You do not have permission to view this data.' });
    }

    const adminUsers = await AdminUser.findAll();
    res.status(200).json(adminUsers);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

/* Login function */
export async function loginAdmin(req, res) {
  console.log("Request Body: ", req.body);
  try {
    const { admin_username, password } = req.body;
    const admin = await AdminUser.findOne({ where: { admin_username } });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Retrieve the admin's role from the database
    const role = admin.role;

    await LoginLog.create({
      admin_username: admin_username,
      role: role, // Set the role based on the database value
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      loginTimestamp: new Date(),
      status: 'success'
    });

    const token = jwt.sign(
      { admin_username: admin_username, role: role },
      SECRET_KEY
    );

    res.status(200).json({ message: 'Admin login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}

  