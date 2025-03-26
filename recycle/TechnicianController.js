import Technician from '../models/technician.model.js';

// ✅ Create a new Technician
export async function createTechnician(req, res) {
    try {
        const { fullName, phoneNumber, email, expertise, availabilityStatus } = req.body;

        if (!fullName || !phoneNumber || !expertise) {
            return res.status(400).json({ success: false, message: 'Required fields are missing.' });
        }

        const technician = await Technician.create({
            fullName,
            phoneNumber,
            email,
            expertise,
            availabilityStatus
        });

        return res.status(201).json({
            success: true,
            message: 'Technician created successfully!',
            data: technician
        });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

// ✅ Get all Technicians (with Pagination)
export async function getAllTechnicians(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const options = { page: parseInt(page, 10), limit: parseInt(limit, 10) };

        const technicians = await Technician.aggregatePaginate(Technician.aggregate([]), options);

        return res.status(200).json({
            success: true,
            message: 'All technicians fetched successfully',
            data: technicians
        });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

// ✅ Get a Single Technician by ID
export async function getTechnicianById(req, res) {
    try {
        const { id } = req.params;
        const technician = await Technician.findById(id);

        if (!technician) {
            return res.status(404).json({ success: false, message: 'Technician not found' });
        }

        return res.status(200).json({ success: true, data: technician });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

// ✅ Update Technician
export async function updateTechnician(req, res) {
    try {
        const { id } = req.params;
        const updatedTechnician = await Technician.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTechnician) {
            return res.status(404).json({ success: false, message: 'Technician not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Technician updated successfully',
            data: updatedTechnician
        });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

// ✅ Delete Technician
export async function deleteTechnician(req, res) {
    try {
        const { id } = req.params;
        const deletedTechnician = await Technician.findByIdAndDelete(id);

        if (!deletedTechnician) {
            return res.status(404).json({ success: false, message: 'Technician not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Technician deleted successfully'
        });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}
