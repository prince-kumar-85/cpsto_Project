
# CPSTO Project

## 🚀 Overview
A full-stack hospital management system with advanced authentication, role-based dashboards, and modern UI/UX. Built for scalability, security, and maintainability.

---

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Frontend   │ <--> │   Backend   │ <--> │  MongoDB    │
└─────────────┘      └─────────────┘      └─────────────┘
  React/Vite         Node.js/Express        Cloud DB
```

---

## 📦 Backend

### Features
- **JWT Authentication**: Secure login/signup for users and admins
- **Single-session enforcement**: Only one active session per user/admin
- **Role-based access control**: Middleware restricts routes by role
- **Input validation**: Express-validator for robust data integrity
- **RESTful API**: Clean endpoints for all operations
- **Environment config**: `.env` for secrets and URLs
- **Logging**: Morgan for request logging

### Folder Structure
```
backend/
  controllers/        # Business logic
  middleware/         # Auth middleware
  models/             # Mongoose schemas
  routes/             # Express routes
  utils/              # Token generation, validators
  .env                # Environment variables
  package.json        # Dependencies & scripts
  server.js           # Entry point
```

### API Endpoints
#### User
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user
- `POST /api/auth/logout` — Logout user
- `GET /api/auth/me` — Get authenticated user info
- `GET /api/auth/dashboard` — User dashboard

#### Admin
- `POST /api/admin/signup` — Register new admin
- `POST /api/admin/login` — Login admin
- `POST /api/admin/logout` — Logout admin
- `GET /api/admin/dashboard` — Admin dashboard

### Security
- **JWT Secret**: Store securely in `.env`
- **Password Hashing**: bcryptjs
- **Session Validation**: Only valid `jti` can access protected routes
- **CORS**: Only allows requests from configured frontend origin

### Environment Setup
1. Copy `.env` and set your MongoDB URI, JWT secret, and client origin
2. Install dependencies:
  ```sh
  cd backend
  npm install
  ```
3. Start server:
  ```sh
  npm run dev
  ```
  Server runs on `http://localhost:4000`

---

## 💻 Frontend

### Features
- **React SPA**: Fast, modern UI with Vite
- **Routing**: React Router for navigation
- **User/Admin Dashboards**: Role-based UI components
- **Authentication**: Login/signup forms, token storage
- **Responsive Design**: Modern CSS, Bootstrap
- **Error Handling**: User-friendly messages

### Folder Structure
```
frontend/
  public/             # Static assets
  src/
   components/
    admin/          # Admin UI components
    userUIfolder/   # User UI components
   App.jsx           # Main app
   main.jsx          # Entry point
  index.html          # HTML template
  package.json        # Dependencies
  vite.config.js      # Vite config
  README.md           # (this file)
```

### Key Components
- `Home.jsx` — Main landing page
- `Login.jsx` / `Signup.jsx` — User authentication
- `AdminLogin.jsx` / `AdminSignup.jsx` — Admin authentication
- `AdminDashboard.jsx` — Admin dashboard
- `UserDashboard.jsx` — User dashboard
- `UserHeader.jsx` / `UserFooter.jsx` — Layout components

### Environment Setup
1. Install dependencies:
  ```sh
  cd frontend
  npm install
  ```
2. Start frontend:
  ```sh
  npm run dev
  ```
  App runs on `http://localhost:5173`

---

## 🔒 Authentication & Security
- **JWT tokens**: Issued on login, stored in localStorage/sessionStorage
- **Single-session**: Only one active session per user/admin (enforced in backend)
- **Role-based protection**: Middleware checks token, role, and session
- **Logout**: Clears session both client and server side
- **Password security**: bcryptjs for hashing

---

## ⚙️ Environment & Configuration
- **Windows OS**: Default shell PowerShell
- **.env**: Store secrets, DB URI, JWT config, CORS origin
- **CORS**: Configured for local development

---

## 🧪 Testing & Validation
- **Manual testing**: Use Postman or browser for API endpoints
- **Validation**: All forms and API endpoints use express-validator
- **Error handling**: Clear error messages for invalid input, expired sessions, etc.

---

## 🚢 Deployment
- Set production values in `.env`
- Use process managers (PM2, Docker) for backend
- Build frontend with `npm run build` and serve with static server
- Ensure secure environment variables and HTTPS in production

---

## 🛠️ Troubleshooting
- **MongoDB connection error**: Check `MONGO_URI` in `.env`
- **CORS issues**: Ensure `CLIENT_ORIGIN` matches frontend URL
- **JWT errors**: Check `JWT_SECRET` and token handling
- **Port conflicts**: Ensure ports 4000 (backend) and 5173 (frontend) are free
- **Session issues**: Only one active session per user/admin allowed

---

## 🤝 Contribution Guidelines
1. Fork the repo and create your branch
2. Follow code style and folder structure
3. Document your changes
4. Submit a pull request with clear description

---

## 📄 License
MIT

---

## 👤 Author
prince-kumar-85

---

## 📬 Contact
For issues, open a GitHub issue or contact the author via GitHub.
