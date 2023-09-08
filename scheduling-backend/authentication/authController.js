/* authentication/authController.js */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import Client from '../models/Client.js';
import LoginLog from '../models/LoginLog.js';  
import db from '../database.js';

const SECRET_KEY = '2d2d9154cfa511986f9c21c596789329db50411269a695d66a65ca64940c64be'; 


export async function registerAdmin(req, res) {
  try {
    const {              
            first_name, 
            last_name, 
            gender, 
            email, 
            mobile, 
            admin_username, 
            password, 
            role,
          } = req.body;
    
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdminUser = await AdminUser.create({
      
      first_name,
      last_name,
      gender,
      email,
      mobile,
      admin_username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'Admin registered successfully', newAdminUser });
  } catch (error) {
    res.status(500).json({ message: 'Admin registration failed' });
  }
}




  

export async function registerClient(req, res) {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      birthday,
      gender,
      street,
      city,
      state,
      postal_code,
      country,
      email,
      mobile,
      company_school,
      password,
      unitapptnumber,
      client_username,
    } = req.body;

    /* Hash the password before storing it in the database */
    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = await Client.create({
      first_name,
      middle_name,
      last_name,
      birthday,
      gender,
      street,
      city,
      state,
      postal_code,
      country,
      email,
      mobile,
      company_school,
      password: hashedPassword,
      unitapptnumber,
      client_username,
      role: 'client',  /* Default role for client */
    });

    if (newClient) {
      res.status(200).json({ message: 'Client registration successful' });
    } else {
      res.status(500).json({ message: 'Client registration failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




export async function loginAdmin(req, res) {
  try {
    const { admin_username, password } = req.body;
    const admin = await AdminUser.findOne({ where: { admin_username } });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const role = admin.role;  /* Fetch role from the database object */

    await Login_logs.create({  
      admin_username: admin_username,
      role: role,
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      loginTimestamp: new Date(),
      status: 'success'
    });

    const token = jwt.sign({ admin_username: admin_username, role: role }, SECRET_KEY);

    res.status(200).json({ message: 'Admin login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function loginClient(req, res) {
  try {
    const { client_username, password } = req.body;
    const client = await Client.findOne({ where: { client_username } });

    if (!client || !bcrypt.compareSync(password, client.password)) {
      return res.status(401).json({ message: 'Invalid user ID or password' });
    }

    const role = 'client';  /* Role is hardcoded for clients */

    await Login_logs.create({  
      client_username: client_username,
      role: role,
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      loginTimestamp: new Date(),
      status: 'success'
    });

    const token = jwt.sign({ client_username: client_username, role: role }, SECRET_KEY);

    res.status(200).json({ message: 'Client login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function loginAdminMaster(req, res) {
  try {
    const { admin_username, password } = req.body;
    const adminMaster = await AdminUser.findOne({ where: { admin_username } });

    if (!adminMaster || !bcrypt.compareSync(password, adminMaster.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const role = adminMaster.role;  /* Fetch role from the database object */

    await Login_logs.create({
      admin_username: adminMaster.id,
      role: role,
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      loginTimestamp: new Date(),
      status: 'success',
    });

    const token = jwt.sign(
      { id: adminMaster.id, role: role },
      SECRET_KEY
    );

    res
      .status(200)
      .json({ message: 'Admin Master login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

