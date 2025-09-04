# IELTS Practice Platform MVP

A comprehensive web application for IELTS test practice with secure phone-based authentication and progress tracking.

## Features

### Authentication
- Phone number-based login (no SMS required)
- Device limit enforcement (max 3 devices per phone number)
- Admin and student role separation

### Student Features
- Clean dashboard with test section navigation
- Full test and part-by-part practice modes
- Progress tracking and test history
- Writing submission with automatic document generation
- Theme toggle (light/dark mode)
- Profile management

### Admin Features
- User management (add/remove students)
- Test upload and management
- System settings configuration
- Complete access to all user data

### Technical Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with dark mode support
- **Backend**: Firebase (Firestore, Functions, Storage, Hosting)
- **Authentication**: Custom phone-based system
- **Document Generation**: docx library for writing submissions

## Setup Instructions

### 1. Firebase Configuration

1. Create a new Firebase project
2. Enable Firestore Database
3. Enable Firebase Storage
4. Enable Firebase Functions
5. Copy your Firebase config to `src/firebase/config.ts`

### 2. Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Firebase configuration values

### 3. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 4. Deploy Storage Rules

```bash
firebase deploy --only storage:rules
```

### 5. Deploy Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### 6. Initialize Demo Data

The app includes mock data for development. For production:

1. Add admin phone numbers to Firestore `users` collection
2. Set `isAdmin: true` for admin users
3. Upload test content to appropriate collections

## Default Admin Numbers

- +998 77 777 19 68
- +998 91 012 24 61

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
firebase deploy --only hosting
```

## Security Features

- Row Level Security (RLS) through Firestore rules
- Device limit enforcement via Cloud Functions
- Secure file uploads to Firebase Storage
- Admin-only access to sensitive operations

## File Structure

```
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Student/        # Student dashboard and features
│   ├── Admin/          # Admin dashboard and management
│   ├── Layout/         # Header and layout components
│   └── Common/         # Shared components
├── contexts/           # React contexts (Auth, Theme)
├── hooks/             # Custom React hooks
├── services/          # API and Firebase services
├── utils/             # Utility functions
└── data/              # Mock data for development

functions/             # Firebase Cloud Functions
firestore.rules       # Firestore security rules
storage.rules         # Storage security rules
```