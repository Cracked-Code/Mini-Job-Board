# 🎯 Job Tracker 2000

A full-stack web application for tracking job applications. Built with Node.js, Express, SQLite, and vanilla JavaScript.

## 📋 Features

- ✅ User authentication (register/login) with JWT
- ✅ Add, view, and track job applications
- ✅ Secure password hashing with bcrypt
- ✅ RESTful API backend
- ✅ SQLite database for data persistence

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Custom styling with Orbitron font)
- Vanilla JavaScript (ES6+)
- Font Awesome icons

### Backend
- Node.js
- Express.js v5
- SQLite (node:sqlite)
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- Helmet for security

## 📦 Installation

### Prerequisites
- Node.js (v20 or higher)
- npm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/job-tracker-2000.git
cd job-tracker-2000
```

2. **Install dependencies**
```bash
npm install express bcryptjs jsonwebtoken helmet  
```

3. **Create .env file**
```bash
# Create .env in the root directory
echo "PORT=1235" > .env
echo "JWT_SECRET=your_super_secret_key_change_in_production" >> .env
```

4. **Run the application**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:1235
```

## 📁 Project Structure
```
JobPortalProj/
├── src/
│   ├── db.js                 # Database setup
│   ├── server.js             # Express server
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication routes
│   │   ├── jobsRoutes.js     # Job CRUD routes
│   │   └── debugRoutes.js    # Debug endpoints
│   └── middleware/
│       └── authMiddleware.js # JWT verification
├── public/
│   ├── index.html            # Main page
│   ├── style.css             # Styles
│   └── add-job.html          # Add job page
├── .env                      # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
```
POST /auth/register    - Register new user
POST /auth/login       - Login user (returns JWT)
```

### Jobs (Protected - requires JWT)
```
GET    /jobs           - Get all jobs for logged-in user
POST   /jobs           - Create new job
PUT    /jobs/:id       - Update job (TODO)
DELETE /jobs/:id       - Delete job
```

### Debug (Development only)
```
GET /debug/users       - View all users
GET /debug/jobs        - View all jobs
GET /debug/users/:id   - Get jobs by user ID
DELETE /debug/deleteall -Deletes all users and jobs that arent a admin
```

## 💾 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    is_admin BOOLEAN DEFAULT 0
)
```

### Jobs Table
```sql
CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    job_title TEXT,
    job_description TEXT,
    date_applied INTEGER,
    accepted BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
```

## 🔐 Security Features

- Password hashing with bcrypt (8 rounds)
- JWT authentication for protected routes
- Helmet.js for HTTP headers security
- CORS protection
- SQL injection prevention (prepared statements)

## 📝 Usage

### 1. Register an Account
- Navigate to the home page
- Enter username and password
- Click "Register"

### 2. Login
- Enter your credentials
- Click "Login"
- You'll be redirected to the jobs dashboard

### 3. Add a Job
- Click "Add New Job"
- Fill in job details (title, description, date)
- Click "Submit"

### 4. View Jobs
- Click "Update Board" to refresh
- See all your job applications in a table
- Track application status

## 🎨 Customization

### Change Colors
Edit `style.css`:
```css
body {
    background-color: rgba(166, 194, 236, 0.801); /* Change this */
}

.buttons button {
    background-color: lightblue; /* Change button color */
}
```

### Change Font
Update the Google Fonts import in HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

## 🐛 Known Issues

~~- Database is in-memory (resets on server restart)~~
  ~~- *To fix: Change `:memory:` to `./database.db` in `db.js`*~~
~~- No edit/delete functionality yet (coming soon)~~
- No pagination for large job lists

## 🚧 Roadmap

~~- [ ] Edit and delete job functionality~~
- [ ] Filter jobs by status (pending/accepted)
- [ ] Search functionality
- [ ] Export jobs to CSV
- [ ] Email notifications
- [ ] Dark mode
~~- [ ] Persistent database (SQLite file)~~
- [ ] Deploy to cloud (Heroku/Railway)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Nick C
- GitHub: [@Cracked-Code](https://github.com/Cracked-Code)

## 🙏 Acknowledgments

- Node.js and Express.js communities
- Font Awesome for icons
- Google Fonts for Orbitron font

## 📧 Contact

For questions or feedback, please open an issue or contact me on github

---

ReadMe made with the help of Claude





