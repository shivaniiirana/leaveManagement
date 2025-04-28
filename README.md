# 🏖️ Leave Management System

A full-featured user onboarding and leave management system built with Node.js, Nestjs, MongoDB, JWT, Redis, Nodemailer, and logging tools like Winston.

---![Screenshot from 2025-04-25 13-11-17](https://github.com/user-attachments/assets/13ff49ee-928b-41ca-bd1b-ae7a597d6cab)

![Screenshot from 2![Screenshot from 2025-04-25 12-04-28](https://github.com/user-attachments/assets/b9748ede-0626-480b-80cc-3e2449e73a22)
025-04-25 13-28-04](https://github.com/user-attachments/assets/4d81666f-ca25-4910-b560-c6d5ea29c0eb)
![Screenshot from 2025-04-25 12-21-16](https://github.com/user-attachments/assets/2177219c-e551-486b-8228-c255d821e7dd)![Screenshot ![Screenshot from 2025-04-25 12-40-24](https://github.com/user-attachments/assets/026b251b-f71f-44f6-9d81-c20c4b822103)
from 2025-04-25 12-31-26](https://github.com/user-attachments/assets/532c4d76-125e-4b3e-a3c1-7c5fd1b03a59)
![Screenshot from 2025-04-25 12-49-41](https://github.com/user-attachments/assets/1541e89f-8fc5-45da-a1cc-dd7f8057f3bb)



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
![Screenshot from 2025-04-25 12-04-28](https://github.com/user-attachments/assets/05f429dc-3112-4fb3-8178-4714166f8f2a)


