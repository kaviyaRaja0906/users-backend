const express = require('express');
const router = express.Router();
const RolePermission = require('../models/roles');
const app = express();
app.use(express.json());

router.post('/roles', async (req, res) => {
  try {
    const { role, permissions } = req.body;

    const existingRole = await RolePermission.findOne({ role });

    if (existingRole) {
      return res.status(400).json({ message: 'Role with this name already exists.' });
    }
    const newRolePermission = new RolePermission({
      role,
      permissions,
    });

    await newRolePermission.save();

    res.json({ message: 'Role and permissions saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/roles', async (req, res) => {
    try {
      const roles = await RolePermission.find();
      res.json(roles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/role/:role', async (req, res) => {
    try {
      const roleName = req.params.role;
      const role = await RolePermission.findOne({ role: roleName });
  
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
  
      res.json(role);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
