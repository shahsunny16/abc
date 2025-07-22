# 🏨 StayNest – Luxury Hotel Booking Platform

**StayNest** is a full-stack luxury hotel booking platform built with the **MERN stack**, integrating **Firebase** for secure authentication, **Stripe** for real-time payments, and **Firebase Storage** for managing hotel images. It provides a seamless experience for users to browse, book, and pay for luxury hotel rooms online — quickly, securely, and confidently.

## 🚀 Live Demo

👉 [Live Link](https://staynest-vo34.onrender.com/)

## ✨ Features

- 🔑 **User Authentication** – Secure login/signup using Firebase  
- 🏨 **Hotel Browsing** – Explore luxury hotels with detailed listings and images  
- 💳 **Real-Time Payments** – Stripe integration for smooth payment handling  
- 🖼 **Image Storage** – Hotel images stored and managed via Firebase  
- 🎨 **Modern UI** – Beautiful, responsive design powered by Tailwind CSS  
- ⚡ **Full-Stack MERN** – Scalable backend with MongoDB, Express, Node.js, and React  

## 🛠 Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express.js  

**Database:**  
- MongoDB with Mongoose  

**Authentication & Storage:**  
- Firebase Authentication  
- Firebase Storage  

**Payments:**  
- Stripe API  

**Deployment:**  
- Render

## 📂 Installation & Setup

Follow these steps to run StayNest locally:

```bash
# 1. Clone the repository
git clone https://github.com/shahsunny16/final-hotel.git
cd final-hotel

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install

# 4. Configure environment variables
# In /server/.env, add the following:
# (Replace values with your actual credentials)

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_API_SECRET=your_firebase_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password

# 5. Build & start the server
cd ../server
npm run build

# 6. Start the client
cd ../client
npm start



