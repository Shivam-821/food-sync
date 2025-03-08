import { registerProducer } from "../controllers/producer.controller.js";
import { verifyToken } from "../middlewares/authProd.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import Router from "express";

const router = Router();

// unsecure route

router
  .route("/register")
  .post(
    upload.single("avatar"),
    registerProducer
  );

// // login
// router
//   .route("/login")
//   .get((req, res) => {
//     return res.render("login");
//   })
//   .post(loginUser);

// // secure routes
// router.route("/profile").get(verifyJWT, (req, res) => {
//   res.render("profile", { loggedInUser: req.user });
// });
// router.route("/logout").get(verifyJWT, logoutUser);
// router.route("/newtoken").get(newToken);
// router.route("/edit/password");
// router
//   .route("/edit/password")
//   .get(verifyJWT, (req, res) =>
//     res.render("editpassword", { loggedInUser: req.user })
//   )
//   .post(verifyJWT, changePassword);
// router
//   .route("/edit/avatar")
//   .patch(verifyJWT, upload.single("avatar"), changeAvatar);
// router.route("/edit/username").patch(verifyJWT, changeusername);
// router.route("/edit/fullname").patch(verifyJWT, changefullname);
// router.route("/editprofile").get(verifyJWT, (req, res) => {
//   if (!req.user) {
//     return res.redirect("/login");
//   }
//   res.render("editprofile", { loggedInUser: req.user });
// });

export default router;
