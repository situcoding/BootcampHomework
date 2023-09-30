/* controllers/client.js */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import LoginLog from '../models/LoginLog.js';
import dotenv from 'dotenv';


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

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
            client_username,
            password,
           
        } = req.body;

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
            client_username,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Client registered successfully!', client: newClient });

    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Error creating client', error: error.message });
    }
}

export async function getAllClients(req, res) {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error retrieving clients:', error);
        res.status(500).json({ message: 'Error retrieving clients', error: error.message });
    }
}

export async function loginClient(req, res) {
    try {
        const { client_username, password } = req.body;

        if (!client_username || !password) {
            return res.status(400).send('Please enter a username and password.');
        }

        const client = await Client.findOne({ where: { client_username } });

        if (!client) {
            return res.status(404).send('Client not found.');
        }

        const isPasswordValid = bcrypt.compareSync(password, client.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password.');
        }

        await LoginLog.create({
            client_username: client.client_username,
            ip_address: req.ip,
            user_agent: req.get('User-Agent'),
            loginTimestamp: new Date(),
            role: 'client',
            status: 'successful'
        });

        const token = jwt.sign({ client_username, role: 'client', first_name: client.first_name }, SECRET_KEY);

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}