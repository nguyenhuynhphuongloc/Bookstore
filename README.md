# 📚 Bookstore Online

A modern web application for buying and managing books online.  
Users can browse books by category, search and filter, add to cart, checkout, and track their orders.  
Admins can manage books, categories, and customer orders.  

This project follows a **RESTful API architecture** to ensure scalability, security, and clear separation between frontend and backend.

---

## ✨ Features

### User
- Register and log in (JWT authentication with refresh token)
- Browse and search books
- Filter and sort by price, category, or rating
- View detailed book information
- Add books to the shopping cart and checkout
- Manage profile and order history

### Admin
- Manage books (CRUD)
- Manage categories
- Manage orders

---

## 🛠 Technology Stack

### Backend
- **Language**: TypeScript  
- **Framework**: NestJS  
- **Database**: MongoDB  
- **Libraries**: 
  - `@nestjs/core`, `@nestjs/common`, `@nestjs/mongoose`, `@nestjs/typeorm`  
  - `jsonwebtoken`, `bcrypt`  
  - `class-validator`, `class-transformer`  
  - `multer` (file upload)  

### Frontend
- **Language**: TypeScript  
- **Framework**: Next.js  
- **Libraries**: React, Axios  
- **UI**: Tailwind CSS, Shadcn/UI  

---

## 🗄 Database Design (MongoDB)

### Users
```json
{
  "_id": ObjectId,
  "email": "string",
  "passwordHash": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "user | admin",
  "phone": "string",
  "address": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
