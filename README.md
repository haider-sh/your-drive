# Your Drive

A secure file storage application built with Node.js and Express that allows users to organize files in folders and share them with others.

## Features

- **User Authentication**: Secure signup and login with password hashing (bcrypt)
- **Folder Management**: Create, update, and delete folders to organize files
- **File Upload**: Upload files to Cloudinary cloud storage
- **File Management**: View, download, and delete files within folders
- **Sharing**: Share folders with others via time-limited share links
- **Session Management**: Persistent user sessions with Prisma session store
- **PostgreSQL Database**: Reliable data storage with Prisma ORM

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating engine
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with local strategy
- **File Storage**: Cloudinary
- **File Upload**: Multer
- **Session Store**: Prisma Session Store
- **Password Hashing**: Bcrypt
- **Validation**: Express Validator

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Cloudinary account (for file storage)
- npm or yarn package manager