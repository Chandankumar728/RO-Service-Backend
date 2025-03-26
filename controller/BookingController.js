import mongoose from 'mongoose';
import Users from '../models/booking.model.js';
import { uploadFile } from '../middleware/_multer.js';
import { hash } from '../utils/index.js';

// ════════════════════════════║  API TO BOOKING RO SERVICE  ║═════════════════════════════════//

export async function bookingRoService(req, res) {
    try {
        const { fullName, phoneNumber, email, address, serviceType, preferredDate, additionalInfo } = req.body;

        // Basic validation
        if (!fullName || !phoneNumber || !email || !address || !serviceType || !preferredDate) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled.'
            });
        }

        // Creating a booking entry in the database
        const booking = await booking.create({
            fullName,
            phoneNumber,
            email,
            address,
            serviceType,
            preferredDate,
            additionalInfo
        });

        return res.status(201).json({
            success: true,
            message: 'Booking successfully created!',
            data: booking
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error while creating booking',
            error: err.message
        });
    }
}



