// backend/controllers/admissionController.js
const Admission = require('../models/admissionSchema');

module.exports = {
  createAdmission: async (req, res) => {
    try {
      const { admissionDate, dischargeDate, diagnosis } = req.body;
      const newAdmission = new Admission({ admissionDate, dischargeDate, diagnosis });
      const savedAdmission = await newAdmission.save();
      res.status(201).json(savedAdmission);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getAdmissions: async (req, res) => {
    try {
      const admissions = await Admission.find();
      res.status(200).json(admissions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAdmissionById: async (req, res) => {
    try {
      const admission = await Admission.findById(req.params.id);
      if (!admission) return res.status(404).json({ message: 'Admission not found' });
      res.status(200).json(admission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateAdmission: async (req, res) => {
    try {
      const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!admission) return res.status(404).json({ message: 'Admission not found' });
      res.status(200).json(admission);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  deleteAdmission: async (req, res) => {
    try {
      const admission = await Admission.findByIdAndDelete(req.params.id);
      if (!admission) return res.status(404).json({ message: 'Admission not found' });
      res.status(200).json({ message: 'Admission deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
