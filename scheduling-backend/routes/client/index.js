import express from 'express';
import { registerClient, getAllClients } from '../../controllers/client.js';
import { loginClient } from '../../controllers/client.js';

const router = express.Router();

/* Route for registering a new admin user*/
router.post('/client-register', (req, res) => {
    console.log("Entered POST /client/client-register");
    registerClient(req, res);
});

/*Route for retrieving all clients*/
router.get('/client-all', (req, res) => {
    console.log("Entered GET /client/client-all");
    getAllClients(req, res);
});


router.post('/client-login', (req, res) => {
    console.log("Entered POST /client/client-login");
    loginClient(req, res); /* Use loginClient controller */
});
/* ... Other client-related routes ...*/

export default router;
