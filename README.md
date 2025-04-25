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


![Screenshot from 2025-04-25 12-04-28](https://github.com/user-attachments/assets/8f2c0aef-f5b2-4622-9221-640664f5c9b8)
![Screenshot from 2025-04-25 12-21-16](https://github.com/user-attachments/assets/88231618-d751-413c-80db-b923cd8d2727)
![Screenshot from 2025-04-25 12-21-57](https://github.com/user-attachments/assets/e2560036-16ec-4fd8-9a8a-206ef0b9020f)
![Screenshot from 2025-04-25 12-23-15](https://github.com/user-attachments/assets/d9eca6e4-28cf-4ca0-891b-c9798f5a68c6)
![Screenshot from 2025-04-25 12-27-40](https://github.com/user-attachments/assets/273f5558-2bb9-4ac1-9a58-8f518afccb8e)
![Screenshot ![Screenshot from 2025-04-25 13-28-04](https://github.com/user-attachments/assets/a0d5c72e-d0f8-470c-ae9a-59f91ab3f10f)
from 2025-04-25 12-28-26](https://github.com/user-attachments/assets/51d071ce-2e40-430a-b1fb-54098ed8966b)![Screenshot from 2025-04-25 13-28-04](https://github.com/user-attachments/assets/4c029e27-f8e0-4c8b-aad0-6c21d2435ff8)

![Screenshot from 2025-04-25 12-31-26](https://github.com/user-attachments/assets/540af4eb-6bc3-4328-9010-aeb40d8d9022)
![Screenshot from 2025-04-25 12-40-24](https://github.com/user-attachments/assets/871fa166-fedd-4e4e-a148-fd40299ad46f)
![Screenshot from 2025-04-25 12-48-06](https://github.com/user-attachments/assets/c7367a16-ff1e-4ec5-9ad6-557e725f9a6c)
![Screenshot from 2025-04-25 12-49-41](https://github.com/user-attachments/assets/b3a30736-6ab3-41f5-8a76-cc17a028c51a)
![Screenshot from 2025-04-25 12-59-52](https://github.com/user-attachments/assets/53aa92aa-2451-471b-b293-da2aa0d85566)
![Screenshot from 2025-04-25 13-11-17](https://github.com/user-attachments/assets/fb75deed-f23f-481c-9bc7-d59c44e025ae)
![Screenshot from 2025-04-25 14-33-04](https://github.com/user-attachments/assets/7fe66048-90b2-4d52-ab0c-d3a117abb10a)
