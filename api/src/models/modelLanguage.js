const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaLanguage = new Schema({
  name: { type: String, required: true },
  initial: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default schemaLanguage;
