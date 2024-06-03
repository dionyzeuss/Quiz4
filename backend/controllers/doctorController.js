// backend/controllers/doctorController.js
const Doctor = require('../models/doctorSchema');

module.exports = {
  createDoctor: async (req, res) => {
    try {
      const { lastName, firstName, speciality, active } = req.body;
      const newDoctor = new Doctor({ lastName, firstName, speciality, active });
      const savedDoctor = await newDoctor.save();
      res.status(201).json(savedDoctor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getDoctors: async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getDoctorById: async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      res.status(200).json(doctor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateDoctor: async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      res.status(200).json(doctor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  deleteDoctor: async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      res.status(200).json({ message: 'Doctor deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
