import rootRouter from 'express';
import {
  authMiddleWare
} from '../../middleware/_middleware.js';
import authRoutes from './AuthRoutes.js';
import usersRoutes from './UsersRoutes.js';
import roleRoutes from './RoleRoutes.js';
import serviceRoutes from './ServiceRoutes.js';
import bookingRoutes from './BookingRoutes.js';
import otp from './OtpRoute.js';
import technicianmaster from './TechnicianMasterRoutes.js';

const router = rootRouter.Router({ mergeParams: true });

router.use('/auth', authRoutes);
router.use('/otp', otp);
router.use('/guest-booking', bookingRoutes);

// ════════════════════════════║  middleware to protect all routes   ║═════════════════════════════════
router.use(authMiddleWare); // protect all routes
// router.use(authCookieMiddleware); // protect all routes
router.use('/user', usersRoutes);
router.use('/role', roleRoutes);
router.use('/service', serviceRoutes);
router.use('/booking', bookingRoutes);
router.use('/technician', technicianmaster);

export default router;
