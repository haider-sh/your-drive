import { Strategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { getUserByUsername, getUserById } from "../db/queries.js";
import { Router } from "express";
import { displayHomepage, displayLoginForm, displaySignupForm, logout, register, validateUser } from "../controllers/user.controller.js";

const router = Router();

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            console.log("Authenticating:", username, password);
            const user = await getUserByUsername(username);

            if (!user) {
                console.log("User not found.");
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                console.log("Password mismatch.");
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

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