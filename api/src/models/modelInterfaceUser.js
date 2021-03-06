/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

import extendSchema from '../utils/extendSchema';
import schemaToken from './modelToken';

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
  // Third party applications
  spotify: {
    type: Object,
    default: {
      token: null
    }
  },
  google: {
    type: Object,
    token: String
  },
  github: {
    type: Object,
    default: {
      token: null
    }
  },
  reddit: {
    type: Object,
    default: {
      token: null
    }
  },
  // Widgets layout
  widgets: Object,
  // Variable used for future mail verification
  isVerified: { type: Boolean, default: false },
  admin: { Boolean, default: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schemaInterfaceUser.plugin(mongooseDelete,
  { deletedAt: true, deletedBy: true, overrideMethods: true });

export default schemaInterfaceUser;
