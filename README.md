# Campus Complaint Management System (CCMS)

A full-stack application for managing campus complaints with an Express.js + MongoDB backend and Flutter .

## Overview
- Backend: Express.js, Mongoose, CORS, Dotenv
- Frontend: Flutter Web (Material 3)
- Data model: Categories and Complaints with CRUD APIs
- Mock Mode: Automatically serves in-memory data if DB auth fails (helpful for demos)

## Architecture
- Backend server: [server.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/server.js)
- Models: [Category.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/models/Category.js), [Complaint.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/models/Complaint.js)
- Controllers: [categoryController.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/controllers/categoryController.js), [complaintController.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/controllers/complaintController.js)
- Routes: [categoryRoutes.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/routes/categoryRoutes.js), [complaintRoutes.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/routes/complaintRoutes.js)
- Flutter entrypoint: [main.dart](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/lib/main.dart)
- Flutter UI screens: [complaint_list_screen.dart](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/lib/screens/complaint_list_screen.dart), [complaint_form_screen.dart](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/lib/screens/complaint_form_screen.dart), [category_list_screen.dart](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/lib/screens/category_list_screen.dart)
- API service: [api_service.dart](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/lib/services/api_service.dart)

## Getting Started

### Prerequisites
- Node.js 18+
- Flutter SDK (stable channel)
- MongoDB Atlas or local MongoDB (optional for Mock Mode)

### Backend Setup
1. Navigate to backend directory:
   - `cd backend`
2. Install dependencies:
   - `npm install`
3. Configure environment:
   - Create `backend/.env` with:
     - `MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<dbName>`
     - `PORT=5000`
   - Note: If `MONGO_URI` is invalid, backend stays up using Mock Mode.
4. Start server:
   - Production: `npm start`
   - Dev (watch): `npm run dev`

### Frontend Setup
1. From project root:
   - `flutter pub get`
2. Run in Chrome:
   - `flutter run -d chrome`

## Mock Mode (No DB Required)
- If MongoDB authentication fails, controllers return in-memory data.
- Categories served by [categoryController.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/controllers/categoryController.js).
- Complaints served by [complaintController.js](file:///c:/Users/Hp/Downloads/CCMS/complaint_management_system/backend/controllers/complaintController.js).
- Useful for demos; data resets on server restart.

## API Endpoints

### Categories
- GET `/api/categories` — List categories
- POST `/api/categories` — Create category
- PUT `/api/categories/:id` — Update category
- DELETE `/api/categories/:id` — Delete category

### Complaints
- GET `/api/complaints` — List complaints
- POST `/api/complaints` — Create complaint
- PUT `/api/complaints/:id` — Update complaint
- DELETE `/api/complaints/:id` — Delete complaint

## Flutter Screens
- Complaint List: cards with title, status, category, and date
- Complaint Form: create new complaint with category selection
- Category List: view/manage categories

## Demo Flow
1. Start backend (`npm start`) and Flutter web (`flutter run -d chrome`).
2. Observe sample data loading if DB is not connected.
3. Create a new category; then file a complaint in that category.
4. Update complaint status; delete if resolved.

## Troubleshooting
- Backend shows `MongoServerError: bad auth`:
  - Verify `MONGO_URI` in `backend/.env`.
  - In the meantime, Mock Mode serves demo data; proceed with UI testing.
- Flutter Chrome stuck “Waiting for connection”:
  - Close any existing Chrome debug windows and rerun.
  - Ensure firewall isn’t blocking local ports.

## Scripts
- Backend:
  - `npm start` — start server
  - `npm run dev` — start with nodemon
- Flutter:
  - `flutter run -d chrome` — launch web app