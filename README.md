# Tirupathi Bike Rentals

A modern bike rental website built with React, TypeScript, and Tailwind CSS. This is a clone of vijaybikerentals.com with enhanced UI featuring yellow and white theme, glassy design elements, and MongoDB integration.

## Features

- **User Authentication**: Login and signup functionality with MongoDB
- **Bike Fleet Management**: Browse available bikes with image scrolling
- **Shopping Cart**: Add bikes to cart with duration selection
- **WhatsApp Integration**: Direct booking via WhatsApp to +91 9393936773
- **Profile Management**: User profile with booking history
- **Responsive Design**: Works on all devices with glassy, minimal UI
- **Multiple Pages**:
  - Home with hero section
  - Fleet with bike listings
  - About Us
  - Contact with form and map
  - Temples Nearby for tourism info
  - User Profile

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Update the `.env` file with your MongoDB password:
   ```
   VITE_MONGODB_URI=mongodb+srv://ganeshbandla934790_db_user:YOUR_PASSWORD@cluster0.cpagi30.mongodb.net/tirupathi_bike_rentals
   VITE_WHATSAPP_NUMBER=9393936773
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: MongoDB
- **Build Tool**: Vite

## Color Scheme

- Primary: Yellow (#FACC15)
- Secondary: White (#FFFFFF)
- Accent: Gray shades
- Minimal glassy design with backdrop blur effects

## Contact

- **Phone**: +91 9393936773
- **Email**: revvv143@gmail.com
- **Location**: Tirupati, Andhra Pradesh

## Notes

- All bookings are processed via WhatsApp
- User authentication stores data in MongoDB
- Cart data is stored in localStorage
- The logo placeholder (TB) can be replaced with your custom logo
- Stock photos from Pexels are used throughout the site
