import useRouter from 'express';
import {
CreateServiceType,
GetAllServiceType,
DeleteService,
GetServiceById,
UpdateService,
UpdateserviceTypestatus

} from '../../controller/ServiceTypeController.js';

const router = useRouter.Router();

router.post('/create-service-type', CreateServiceType); // endpoint: /service-type/create-service-type, body{service-typeName, description}
router.get('/get-all-service-type', GetAllServiceType); // endpoint: /service-type/get-all-service-type
router.put('/update-service-type/:id', UpdateService); // endpoint: /service-type/update-service-type/:id
router.delete('/delete-service-type/:id', DeleteService); // endpoint: /service-type/delete-service-type/:id
router.get('/get-service-type-by-id/:id', GetServiceById); // endpoint: /service-type/get-service-type-by-id/:id
router.put('/update-service-type-status/:id', UpdateserviceTypestatus); // endpoint: /service-type/get-service-type-by-id/:id

export default router;
