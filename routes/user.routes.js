import passport from "../config/auth.config.js";
import { Router } from "express";
import { displayHomepage, displayLoginForm, displaySignupForm, logout, register, validateUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", displayHomepage);
router.get("/login", displayLoginForm);
router.get("/signup", displaySignupForm);
router.get("/logout", logout);

router.post("/signup", validateUser, register);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
})
);

export default router;