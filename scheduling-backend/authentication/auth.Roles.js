/* authentication/authRoles.js */

export const checkRole = roles => (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }
    
    const userRole = req.user.role; 
    
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'You do not have permission.' });
    }
    
    next();
  };
  