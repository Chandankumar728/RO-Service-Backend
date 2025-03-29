import useRouter from 'express';
import {
    bookingRoService,
    getAllBookingRoService,
    updateBookingRoService,
    findBookingRoService,
    deleteBooking,
    findBookingByApplicationNo,
    getBookingListByTechnicianId,PayBookingItem
} from '../../controller/BookingController.js';

const router = useRouter.Router();

router.post('/citizen-booking', bookingRoService); 
router.get('/get-all-booking', getAllBookingRoService); 
router.get('/get-booking-by-id/:id', findBookingRoService); 
router.put('/update-booking-by-id/:id', updateBookingRoService); 
router.delete('/delete-booking-by-id/:id', deleteBooking); 
router.get('/track-applicationByNo', findBookingByApplicationNo); 
router.get('/get-booking-list-by-technician-id', getBookingListByTechnicianId);
router.post('/pay-booking-item', PayBookingItem);


export default router;
