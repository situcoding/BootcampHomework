/* routes/admin/index.js */

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminUser from '../../models/AdminUser.js';
import LoginLog from '../../models/LoginLog.js';

const SECRET_KEY = 'your-2d2d9154cfa511986f9c21c596789329db50411269a695d66a65ca64940c64be'; /* Replace with your actual secret key */

const router = express.Router();

router.post('/admin-login', async (req, res) => {
    try {
        const { admin_username, password } = req.body;
        const admin = await AdminUser.findOne({ where: { admin_username } });

        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        /* Add other necessary data to the token payload if needed */
        const tokenPayload = {
            admin_username: admin.admin_username,
            role: admin.role,
        };

        await LoginLog.create({
            admin_username: admin.admin_username,
            loginTimestamp: new Date(),
            role: admin.role,
            ip_address: req.ip,                    /* Capture IP address */
            user_agent: req.get('User-Agent'),     /* Capture User-Agent header */
            status: 'successful',     
        });

        const token = jwt.sign(tokenPayload, SECRET_KEY);

        res.status(200).json({ message: 'Admin login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;