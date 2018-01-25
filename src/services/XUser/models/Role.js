const mongoose = require("mongoose");
const bluebird = require("bluebird");
const _ = require("lodash");

mongoose.Promise = bluebird;

// Constants
const STATUS_INACTIVE = 1;
const STATUS_ACTIVE = 1;

const roleSchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    status: {
      type: Number,
      default: STATUS_ACTIVE
    },
    permissions: Array
  },
  { timestamps: true }
);

// Defined methods
roleSchema.methods.findAllowedActions = async function findAllowedActions() {
  const permisisons = await this.model("Role").find({ userId: this.userId });
  return permisisons || [];
};

const Role = mongoose.model("Role", roleSchema);
_.assign(Role, { STATUS_INACTIVE, STATUS_ACTIVE });

module.exports = Role;
