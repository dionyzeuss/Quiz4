// backend/models/doctorSchema.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
