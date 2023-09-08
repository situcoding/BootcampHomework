/* controllers/client.js */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import LoginLog from '../models/LoginLog.js';

const SECRET_KEY = '2d2d9154cfa511986f9c21c596789329db50411269a695d66a65ca64940c64be';
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
            password
        } = req.body;

        const hashedPassword = await bcrypt.hashSync(password, 10);

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
            password:hashedPassword,
          
        });

        res.status(201).json({ message: 'Client created successfully!', client: newClient });

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
        console.log('Inside loginClient');  /* Debugging line */
            const { client_username, password } = req.body;

        if (!client_username || !password) {
            console.log('Username or password missing');  /* Debugging line */
            return res.status(400).send('Please enter a username and password.');
        }

        console.log(`Finding client with username: ${client_username}`);  /* Debugging line */
        const client = await Client.findOne({ where: { client_username } });

        if (!client) {
            console.log('Client not found');  /* Debugging line */
            return res.status(404).send('Client not found.');
        }

        const isPasswordValid = bcrypt.compareSync(password, client.password);
        if (!isPasswordValid) {
            console.log('Invalid password'); /* Debugging line */
            return res.status(401).send('Invalid username or password.');
        }

        console.log('Creating login log');  /* Debugging line */
        await LoginLog.create({
            client_username: client.client_username, /* Using client_username instead of id */
            ip_address: req.ip,
            user_agent: req.get('User-Agent'),
            loginTimestamp: new Date(),
            role: 'client',
            status: 'successful'
        });

        console.log('Generating JWT token');  /* Debugging line */
        const token = jwt.sign({ client_username: client_username, role: 'client' }, SECRET_KEY);

        console.log('Login successful');  /* Debugging line */
        res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        console.error('Error logging in:', error); 
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}
