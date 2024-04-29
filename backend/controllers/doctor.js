// Import necessary modules
const Doctor = require('../models/doctorSchema');

// Controller functions for CRUD operations on doctors
module.exports = {
    // Create a new doctor
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

    // Retrieve all doctors
    getAllDoctors: async (req, res) => {
        try {
            const doctors = await Doctor.find();
            res.json(doctors);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Retrieve a single doctor by ID
    getDoctorById: async (req, res) => {
        try {
            const doctor = await Doctor.findById(req.params.id);
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.json(doctor);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Update a doctor by ID
    updateDoctorById: async (req, res) => {
        try {
            const { lastName, firstName, speciality, active } = req.body;
            const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, 
                { lastName, firstName, speciality, active },
                { new: true }
            );
            if (!updatedDoctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.json(updatedDoctor);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Delete a doctor by ID
    deleteDoctorById: async (req, res) => {
        try {
            const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
            if (!deletedDoctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.json({ message: 'Doctor deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
