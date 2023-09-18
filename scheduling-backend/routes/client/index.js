/* routes/client/index.js */

import express from 'express';
import { registerClient, getAllClients, loginClient } from '../../controllers/client.js';

const router = express.Router();

// Route for registering a new client
router.post('/client-register', (req, res) => {
    console.log("Entered POST /client/client-register");
    registerClient(req, res);
});

// Route for retrieving all clients
router.get('/client-all', (req, res) => {
    console.log("Entered GET /client/client-all");
    getAllClients(req, res);
});

// Route for client login
router.post('/client-login', (req, res) => {
    console.log("Entered POST /client/client-login");
    loginClient(req, res);
});

// ... Other client-related routes ...

export default router;
