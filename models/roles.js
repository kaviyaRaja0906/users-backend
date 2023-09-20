const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
  role: String,
  permissions: [String],
},{
  collection: 'roles'
});

const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);
module.exports = RolePermission;
