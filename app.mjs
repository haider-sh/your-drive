import express from "express";
import path from "path";
import passport from "passport";
import dotenv from "dotenv";
import session from "express-session";
import UserRouter from "./routes/user.routes.js";
import FolderRouter from "./routes/folder.routes.js";
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

dotenv.config("./.env");

const app = express();
app.set("views", path.join(path.dirname("views"), "views"));
app.set("view engine", "ejs");

app.use(
  session({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000, 
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", UserRouter);
app.use("/folder", FolderRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server listening on 8080.");
});