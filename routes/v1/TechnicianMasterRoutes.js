import express from 'express';
import { 
    getAllTechnicians
} from '../../controller/TechnicianController.js';

const router = express.Router();

// Create Technician
router.get('/get-all-technician', getAllTechnicians);


export default router;
