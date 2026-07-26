# Support CRM - Customer Support Ticketing System

A full-stack Support CRM built with **Node.js, Express, MongoDB, React, and Tailwind CSS**.

## 🚀 Features
- **Create Ticket:** Auto-generated Ticket IDs (`TKT-001`) with customer details and issue description.
- **Ticket List:** Real-time search and status filtering (Open, In Progress, Closed).
- **Ticket Detail:** View full ticket info, update ticket status, and append internal timeline notes.
- **Responsive UI:** Table view for desktop, stacked card layout for mobile devices.

## 📁 Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), CORS, Dotenv
- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons, Axios, React Router

## 🛠️ Local Setup Instructions

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` file with `PORT` and `MONGO_URI`
4. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. Create `.env` file with `VITE_API_URL`
4. `npm run dev`