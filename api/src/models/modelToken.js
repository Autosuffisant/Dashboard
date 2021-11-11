const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaToken = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: {
    type: Date, required: true, default: Date.now, expires: 7200
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default schemaToken;
