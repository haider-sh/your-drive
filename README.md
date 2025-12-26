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

## Project Structure

```
your-drive/
├── app.mjs                 # Main application entry point
├── package.json            # Project dependencies
├── README.md              # This file
├── config/
│   ├── auth.config.js     # Passport authentication configuration
│   └── upload.config.js   # Multer and Cloudinary upload configuration
├── controllers/
│   ├── user.controller.js # User authentication logic
│   └── folder.controller.js # Folder and file management logic
├── routes/
│   ├── user.routes.js     # User routes (auth, login, signup)
│   └── folder.routes.js   # Folder and file routes
├── db/
│   └── queries.js         # Database query helpers
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migration history
├── public/
│   └── styles.css         # Frontend styling
└── views/
    ├── header.ejs         # Header component
    ├── home.ejs           # Homepage
    ├── loginForm.ejs      # Login page
    ├── signupForm.ejs     # Signup page
    ├── folderForm.ejs     # Create/edit folder form
    ├── folderPage.ejs     # Folder contents view
    ├── fileForm.ejs       # File upload form
    ├── filePage.ejs       # File view
    ├── shareForm.ejs      # Share folder form
    ├── linkPage.ejs       # Shared folder view
    └── errors.ejs         # Error messages
```

## Database Schema

The application uses the following data models:

- **User**: Stores user credentials and authentication information
- **Folder**: User's file folders with sharing capabilities
- **File**: Individual files stored in Cloudinary
- **Shared**: Temporary share links with configurable duration
- **Session**: User session data (managed by Prisma Session Store)

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Cloudinary account (for file storage)
- npm or yarn package manager

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd your-drive
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database
CLOUD_DATABASE_URL=postgresql://user:password@localhost:5432/your_drive

# Server
PORT=8080

# Cloudinary (for file uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Database Setup

Initialize Prisma and set up the database:

```bash
npx prisma migrate deploy
```

To apply pending migrations:

```bash
npx prisma migrate dev
```

### 5. Start the Application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
node app.mjs
```

The application will start on `http://localhost:8080` (or your configured PORT).

## Available Routes

### User Routes
- `GET /` - Homepage
- `GET /login` - Login page
- `GET /signup` - Signup page
- `POST /signup` - Create new account
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Folder Routes
- `GET /folder/create` - Create folder form
- `POST /folder/create` - Save new folder
- `GET /folder/:id` - View folder contents
- `GET /folder/update/:id` - Edit folder form
- `POST /folder/update/:id` - Update folder
- `GET /folder/delete/:id` - Delete folder
- `GET /folder/shareFolder/:id` - Share folder form
- `POST /folder/shareFolder/:id` - Create share link

### File Routes
- `GET /folder/:id/file/create` - Upload file form
- `POST /folder/:id/file/create` - Upload file to Cloudinary
- `GET /folder/:folderId/file/:id` - View file
- `GET /folder/:folderId/file/delete/:id` - Delete file
- `GET /folder/share/:id` - Access shared folder

## Scripts

- `npm run dev` - Start development server with file watching
- `npm test` - Run tests (currently not configured)

## Prisma Commands

Useful Prisma commands for development:

```bash
# View database UI
npx prisma studio

# Create a new migration
npx prisma migrate dev --name <migration_name>

# Reset database (development only)
npx prisma migrate reset
```

## Security Notes

- Passwords are hashed using bcrypt before storage
- Session data is securely stored in the database
- File uploads are handled through Cloudinary
- Share links have configurable time-based expiration
- Consider adding rate limiting and CSRF protection for production

## Development

For development, use the watch mode which automatically restarts the server when files change:

```bash
npm run dev
```

This uses Node's `--watch` flag for convenient development experience.

## Future Enhancements

- Implement user profiles and settings
- Add file search and filtering
- Support for file versioning
- Email notifications for shared folders
- Two-factor authentication