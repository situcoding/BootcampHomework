/* controllers/admin.js */


import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import LoginLog from '../models/LoginLog.js';

const SECRET_KEY = '2d2d9154cfa511986f9c21c596789329db50411269a695d66a65ca64940c64be';

/*Function to register an admin user */
export async function registerAdmin(req, res) {
try {
const { admin_username,
password,
role,
first_name,
middle_name,
last_name,
birthday,
gender,
mobile,
email } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);

 await AdminUser.create({
  admin_username,
  password: hashedPassword,
  role,
  first_name,
  middle_name,
  last_name,
  birthday,
  gender,
  mobile,
  email,
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
    try {
      /* Assuming you've verified req.body.admin_username and req.body.role are secure and validated */
      const { admin_username, role } = req.body;
      const loggedInAdmin = {
        admin_username: admin_username,
        role: role,
      };
  
      await LoginLog.create({
        admin_username: loggedInAdmin.admin_username,
        loginTimestamp: new Date(),
        role: loggedInAdmin.role,
      });
  
      console.log('Generating JWT token');  /* Debugging line */
      const token = jwt.sign({ admin_username: admin_username, role: role }, SECRET_KEY);
  
      console.log('Login successful');  /* Debugging line */
      res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }
  
  