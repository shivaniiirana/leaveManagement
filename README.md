# 🏖️ Leave Management System

A full-featured user onboarding and leave management system built with Node.js, Nestjs, MongoDB, JWT, Redis, Nodemailer, and logging tools like Winston.

---

## 🚀 Tech Stack

- **Backend**: Node.js + (NestJS)
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Mail Service**: Nodemailer
- **Caching / OTP Expiry**: Redis
- **Logging**: Winston & Morgan

---

## 📁 Features

### 👤 User Onboarding

| Endpoint | Description |
|---------|-------------|
| `POST /v1/users/api/signup` | Register a new user |
| `POST /v1/users/api/login` | Authenticate and return a JWT |
| `POST /v1/users/api/forget-password` | Initiate password reset via email |
| `POST /v1/users/api/send-otp` | Resend OTP |
| `POST /v1/users/api/verify-otp` | Verify OTP (valid for 5 minutes) |
| `GET /v1/users/api/profile` | Get user profile |
| `PATCH /v1/users/api/profile` | Update name or profile picture |

🔒 OTPs are stored in Redis and automatically expire after 5 minutes.

---

### 🗓️ Leave Management

- Seed initial **Leave** types into the database.
- New users are auto-assigned **6 total leaves**.
- A user **cannot** apply for more than **1 leave per day**.

| Endpoint | Description |
|----------|-------------|
| `POST /v1/users/api/leave` | Apply for a leave |
| `GET /v1/users/api/leave` | Get all leaves (filter by leave type, supports pagination) |
| `GET /v1/users/api/leave/:leaveId` | Get a specific leave's detail |

---

## ⚙️ Environment Variables

Create a `.env` file and set the following:
```env
JWT_SECRET=abcxyz
MONGO_URI=mongodb://localhost:27017/leaveManagement
ACCESS_KEY_ID=your_aws_access_key
SECRET_ACCESS_KEY=your_aws_secret


