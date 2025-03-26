import useRouter from 'express';
import {
    bookingRoService
} from '../../controller/BookingController.js';

const router = useRouter.Router();

router.post('/citizen-booking', bookingRoService); 


export default router;
