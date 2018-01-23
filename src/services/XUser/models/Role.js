const mongoose = require("mongoose");
const bluebird = require("bluebird");
const _ = require("lodash");

mongoose.Promise = bluebird;

// Constants
const STATUS_INACTIVE = 1;
const STATUS_ACTIVE = 1;

const roleSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: true
    },
    name: { type: String, unique: true, required: true },
    permissions: [{ name: String, actions: Array }]
  },
  { timestamps: true }
);

// Defined methods
userSchema.methods.findAllowedActions = async function findAllowedActions() {
  const permisisons = await this.model("Role").find({ userId: this.userId });

  // Don't have any permission
  if (
    _.isEmpty(permisisons) ||
    !permisisons.actions ||
    _.isEmpty(permisisons.actions)
  )
    return allowedActions;

  return permisisons.actions;
};

const Role = mongoose.model("Role", roleSchema);
_.assign(Role, { STATUS_INACTIVE, STATUS_ACTIVE });

module.exports = Role;
