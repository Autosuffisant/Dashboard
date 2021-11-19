/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const { Schema } = mongoose;

const schemaInterfaceUser = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hash: String,
  salt: String,
  themeColor: {
    type: Object,
    default: {
      r: 0, g: 17, b: 170, a: 1.0
    }
  },
  // Variable used for future mail verification
  isVerified: { type: Boolean, default: false },
  admin: { Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schemaInterfaceUser.plugin(mongooseDelete,
  { deletedAt: true, deletedBy: true, overrideMethods: true });


export default schemaInterfaceUser;
