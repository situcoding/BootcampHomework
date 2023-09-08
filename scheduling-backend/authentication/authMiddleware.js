/* authentication/authMiddleware.js */

import jwt from 'jsonwebtoken';
import cors from 'cors';

const SECRET_KEY = '2d2d9154cfa511986f9c21c596789329db50411269a695d66a65ca64940c64be'; 

export function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (user.role === 'admin_user' || user.role === 'admin_master') {
      req.admin_username = user.admin_username;
      req.role = user.role;  /* Roles can be 'admin_user' or 'admin_master' for admins */
    } else if (user.role === 'client') {
      req.client_username = user.client_username;
      req.role = 'client';  /* Roles are always 'client' for client users */
    }
    
    next();
  });
}

export async function logUserLogin(req, res, next) {
  try {
    let username, role;

    if (req.admin_username) {
      username = req.admin_username;
      role = req.role;
    } else if (req.client_username) {
      username = req.client_username;
      role = 'client';  /* Default role for clients */
    } else {
      console.error('No username information available.');
      return next();
    }

    await LoginLog.create({
      username: username,
      role: role
    });

    next();
  } catch (error) {
    console.error('Error logging login:', error);
    next();
  }
}
 
  error => console.error('Error fetching availability:', error)

