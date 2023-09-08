/*  oneTimeHashPasswords.js */

import bcrypt from 'bcrypt';
import AdminUser from './models/AdminUser.js';  // adjust the import to your project structure
import Client from './models/Client.js';  // adjust the import to your project structure
import db from './database.js';  // adjust the import to your project structure

const hashAndSaveAdmins = async () => {
  try {
    const admins = await AdminUser.findAll();

    for (let admin of admins) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      admin.password = hashedPassword;
      await admin.save();
    }

    console.log("Admin passwords updated successfully!");
  } catch (error) {
    console.error("An error occurred while updating admin passwords:", error);
  }
};

const hashAndSaveClients = async () => {
  try {
    const clients = await Client.findAll();

    for (let client of clients) {
      const hashedPassword = await bcrypt.hash(client.password, 10);
      client.password = hashedPassword;
      await client.save();
    }

    console.log("Client passwords updated successfully!");
  } catch (error) {
    console.error("An error occurred while updating client passwords:", error);
  }
};

const hashAndSaveAll = async () => {
  await hashAndSaveAdmins();
  await hashAndSaveClients();

  // Close the database connection
  await db.close();
};

hashAndSaveAll();
