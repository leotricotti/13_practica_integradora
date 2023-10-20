import { Router } from "express";
import {
  signupUser,
  failRegister,
  failLogin,
  loginUser,
  updatePassword,
  forgotPassword,
  githubCallback,
  currentUser,
} from "../controllers/sessions.controller.js";
import { passportCall } from "../utils/utils.js";

//Inicializa servicios
const router = Router();

//Ruta que realiza el registro
router.post(
  "/signup",
  passportCall("register", {
    session: false,
    passReqToCallback: true,
    failureMessage: true,
    failureRedirect: "api/sessions/failedRegister",
  }),
  signupUser
);

//Ruta que se ejecuta cuando falla el registro
router.get("/failRegister", failRegister);

//Ruta que realiza el login
router.post("/login", loginUser);

//Ruta que recupera la contraseña
router.post("/forgotPassword", forgotPassword);

//Ruta que actualiza la contraseña
router.post("/updatePassword", updatePassword);

//Ruta que se ejecuta cuando falla el login
router.get("/failLogin", failLogin);

// Ruta que envia el usuario logueado
router.get("/current", passportCall("jwt"), currentUser);

//Ruta que realiza el login con github
router.get(
  "/github",
  passportCall("github", { scope: ["user:email"] }, async (req, res) => {})
);

//Callback de github
router.get(
  "/githubcallback",
  passportCall("github", {
    failureRedirect: "/login",
    session: false,
    failureMessage: true,
  }),
  githubCallback
);

export default router;
