import useRouter from 'express';
import {
  GetUser,
  UploadProfileImage,
  UpdateUser,
  GetAllUsers,
  GetUserWithId,
  UpdateUserAdmin,
  UpdatePermission,
  CreateUser,
  CreateUserWithImage,
  UpdateUserStatus,
  updateUserwithImage
} from '../../controller/UserController.js';

const router = useRouter.Router();

router.get('/get-user', GetUser); // endpoint: /user/get-user
router.get('/get-all-user', GetAllUsers); // endpoint: /user/get-all-user?limit=10&page=1
router.put('/upload-image-url', UploadProfileImage); // endpoint: /user/upload-image-url {imageUrl}
router.put('/update-profile', UpdateUser); // endpoint: /user/update-profile {fullName, mobile, address}
router.get('/edit/:id', GetUserWithId); // endpoint: /user/edit/:id
router.put('/update-user/:id', UpdateUserAdmin); // endpoint: /user/update-user/:id {fullName, mobile, email, status, role}
router.put('/update-permission/:id', UpdatePermission); // endpoint: /user/update-permission/:id {permission}
router.post('/create-user', CreateUser); // endpoint: /user/create-user {fullName, mobile, email, password, role}
router.post('/create-user-with-img', CreateUserWithImage); // endpoint: /user/create-user-with-img
router.put('/update-user-status/:id', UpdateUserStatus); // endpoint: /user/update-user-status/:id
router.put('/update-user-with-image/:id', updateUserwithImage); // endpoint: /user/update-user-with-image/:id

export default router;
