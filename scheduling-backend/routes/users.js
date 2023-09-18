
/* routes/users.js */

import express from 'express';

const router = express.Router();

router.get('/:username', (req, res, next) => {
  const username = req.params.username;
  const role = req.role;  // This should be set by some preceding middleware

  if (role === 'admin') {
    // Fetch admin details from a database using username
    res.send(`Details for admin with username: ${username}`);
  } else if (role === 'client') {
    // Fetch client details from a database using username
    res.send(`Details for client with username: ${username}`);
  } else {
    res.status(400).send('Invalid role specified');
  }
});


export default router;
