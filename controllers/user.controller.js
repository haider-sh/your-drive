import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { createNewUser, getAllFolders, getUserById, getUserByUsername } from "../db/queries.js";

const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
    body("username").trim()
        .isLength({ min: 1, max: 20 }).withMessage(`User name ${lengthErr}`)
        .custom(async value => {
            const user = await getUserByUsername(value);
            if (user) {
                throw new Error("Username already taken.");
            }
        }),
    body("password").custom((value, { req }) => {
        if (value !== req.body.confirmpassword) {
            throw new Error("Passwords do not match.");
        }
        return true;
    })
];

async function displayHomepage(req, res) {
    const [folders, folderSums] = await getAllFolders();

    folders.map(folder => {
        let folderSum = folderSums.find(folderSum => folderSum.folder_id === folder.id);
        if (!folderSum) {
            folder.size = 0;
            folder.fileCount = 0
        } else {
            folder.size = (folderSum._sum.size / (1024 * 1024)).toFixed(2);
            folder.fileCount = folder._count.files;
        }
        return folder;
    });

    console.log(folders);
    res.render("home", { folders });
}

function displayLoginForm(req, res) {
    res.render("loginForm");
}

function displaySignupForm(req, res) {
    res.render("signupForm");
}

async function register(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("signupForm", {
                errors: errors.array(),
            });
        }

        console.log(req.body.username, req.body.password);
        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await createNewUser(req.body.username, hashedPassword);
        console.log(user);

        res.redirect("/login");
    } catch (err) {
        return next(err);
    }
}

function logout(req, res) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}

export {
    register,
    displayHomepage,
    displayLoginForm,
    displaySignupForm,
    validateUser,
    logout
}