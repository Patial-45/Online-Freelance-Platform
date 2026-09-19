<div align="center">

# ⚡ VectraWork (formerly Freelansters)
### The Precision Freelance & Engineering Marketplace — 2026 Overhaul

[![Vite 8](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React 18](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>VectraWork</b> connects visionary enterprises and clients with elite freelance engineers, designers, and specialists backed by automated 3-stage milestone escrow and 0% hidden platform fees.
</p>

[🌐 Live Demo on Vercel](https://online-freelance-platform-qh7l.vercel.app/) • [📑 Module Roadmap (MODULES.md)](MODULES.md) • [✨ Bug Reports & Features](https://github.com/Patial-45/Online-Freelance-Platform/issues)

</div>

---

## 🌟 2026 Modernization Highlights

VectraWork has undergone a complete architectural, design, and performance overhaul:

- **🎨 2026 Design System**: Clean white canvas (`#ffffff` / `#f8fafc`) accented by precision teal/cyan gradients (`#0f766e`, `#0d9488`, `#1cd6ce`), paired with modern typography (`Plus Jakarta Sans`, `Inter`, and `PT Serif`).
- **🛡️ Milestone Escrow & Platform Hub**: Replaced legacy cartoon clip-art with an interactive, high-trust Milestone Escrow Hub showcasing live vault balances ($14,500 USD), verified 3-stage milestone steppers, 0% specialist fees, and 100% escrow cover.
- **🌀 Restored 3D Swiper Coverflow Motion**: Smooth horizontal left-to-right Coverflow glide across **14 specialized industry sectors** with authentic perspective depth, category chip pre-selection, and mandate counters.
- **💼 Curated Enterprise Job Mandates**: 14 realistic job opportunities spanning every industry ($1,100–$6,000 USD budgets, verified deliverables, client entities) seeded into MongoDB.
- **📋 3-Step Job Posting Wizard**: Enterprise wizard breaking job creation into Scope & Sector, Milestones & Skills with recommendation chips, and Escrow Budget with 0% client surcharge.
- **👥 Dual-Mode Client & Specialist Workspace**: Instant switcher in User Dashboard between Specialist mode and Client/Employer mode with company profile editing and interactive proposal review (`[Shortlist]`, `[Accept & Fund Escrow]`, `[Decline]`).
- **👨‍💻 Our Team Spotlight**: Dedicated showcase for **Sahil Patial (Software Engineer & Founder)** featuring authentic photography, competence chips, ambient aura motion, and sliding social drawer.
- **⚡ Sub-Second Dev Server Reloads**: Migrated to Vite 8 with `optimizeDeps.include` pre-bundling and non-blocking asynchronous Google Fonts preloading.
- **🔒 Defensive Security Hardening**: HTTP security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`), bcrypt verification enforcement on JWT issuance, and Cloudflare WAF alignment.

---

## 🏗️ Architecture & Tech Stack

```
VectraWork Monorepo
├── Client/                     # Frontend (Vite 8 + React 18 SPA)
│   ├── public/                 # Static public assets (favicon, images)
│   ├── src/
│   │   ├── Components/         # Modular UI Components (Navbar, Hero, Coverflow, Escrow, Footer)
│   │   ├── context/            # Auth, Job & Freelancer State Contexts
│   │   ├── Img/                # Curated assets (team photography, icons)
│   │   ├── services/           # Axios API Client & Gateway
│   │   ├── App.jsx             # Main Application Container
│   │   └── Routing.jsx         # Client-Side SPA Routes (React Router 6)
│   ├── index.html              # HTML Shell with Async Fonts & VectraWork Metadata
│   ├── tailwind.config.cjs     # 2026 Color Palette, Shadows & Fonts
│   └── vite.config.js          # Vite 8 Build, Proxy & optimizeDeps Config
│
├── Server/                     # Backend API (Node.js + Express + Mongoose)
│   ├── db/conn.js              # Resilient MongoDB Connection
│   ├── middleware/             # JWT Authentication Middleware
│   ├── model/                  # Mongoose Schemas (User, Job Mandates, Freelancer Profiles)
│   ├── router/                 # Modular Authentication & API Endpoints
│   └── server.js               # Express Gateway, Security Headers & Seed Pipeline
│
├── vercel.json                 # Production Build & SPA Routing Configuration
├── MODULES.md                  # Comprehensive Module Tracking Document (MOD-01 – MOD-06)
└── README.md                   # Project Documentation
```

### 💻 Technologies
| Domain | Stack |
|---|---|
| **Frontend** | React 18, Vite 8, Tailwind CSS, Lucide React Icons, Swiper 9 (Parallax & Coverflow), React Router 6 |
| **Backend** | Node.js, Express 4, MongoDB, Mongoose 7, JSON Web Tokens (JWT), Bcrypt.js, Cookie-Parser, CORS |
| **Deployment** | Vercel (Unified SPA Static Build + Serverless API Functions) |
| **Security** | OWASP Security Headers, Strict Origin Isolation, Cloudflare WAF & Turnstile Alignment |

---

## 🚦 Module Status Overview

All 6 core modules in the **Module-Wise Development Plan** ([`MODULES.md`](MODULES.md)) are 100% complete and verified:

| Module ID | Module Name | Status | Key Deliverables |
|---|---|:---:|---|
| **MOD-01** | Architecture, Build System & Vercel Deployment | 🟢 Complete | Vite 8 migration, instant HMR, clean 10s builds, hardened `.gitignore` |
| **MOD-02** | Authentication, Security & User Management | 🟢 Complete | Bcrypt verification fix, token-based AuthContext, HTTP security headers |
| **MOD-03** | Jobs Marketplace & Proposals | 🟢 Complete | 14 specialized categories, 14 seeded enterprise mandates, 3-step wizard |
| **MOD-04** | Freelancers Directory & Booking Engine | 🟢 Complete | Verified specialists directory, booking modal with API integration |
| **MOD-05** | 2026 UI/UX Design System Overhaul | 🟢 Complete | VectraWork rebrand, Milestone Escrow Hub, Coverflow gliding, Team card |
| **MOD-06** | Communication, Escrow Simulator & Enterprise Profiles | 🟢 Complete | Dual-mode Client dashboard, interactive proposal review, Escrow Simulator |

---

## 🛠️ Local Development & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster connection URI

### 1. Clone the Repository
```bash
git clone https://github.com/Patial-45/Online-Freelance-Platform.git
cd Online-Freelance-Platform
```

### 2. Configure Environment Variables
Create a `.env` file in the `Server/` directory (see [`Server/.env.example`](Server/.env.example)):
```env
PORT=5000
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/vectrawork?retryWrites=true&w=majority
SECRET_KEY=your_super_secret_jwt_key_2026
NODE_ENV=development
BASE_URL=http://localhost:3000
```

Create a `.env` file in the `Client/` directory:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Run the Backend API
```bash
cd Server
npm install
npm run dev
# Server will run on http://localhost:5000
```

### 4. Run the Frontend (Vite)
In a separate terminal:
```bash
cd Client
npm install
npm run dev
# Frontend will run on http://localhost:3000
```

### 5. Production Build Verification
To test the production build locally:
```bash
cd Client
npm run build
# Compiles to Client/dist in ~10-15 seconds
```

---

## 🚀 Deployment to Vercel

VectraWork is configured for unified deployment via [`vercel.json`](vercel.json):
* The Client SPA is compiled using `@vercel/static-build` with `distDir: "dist"`.
* The Express backend routes under `/api/(.*)` run serverless via `@vercel/node`.
* Client-side SPA routes automatically fallback to `/Client/index.html`.

To deploy:
```bash
# Push to main branch (if GitHub Git Integration is enabled)
git push origin main

# Or deploy directly using Vercel CLI
npx vercel --prod
```

---

## 👨‍💻 Author & Leadership

**Sahil Patial**  
*Software Engineer & Founder*  
📍 Solan, Himachal Pradesh, India  

- **GitHub**: [@Patial-45](https://github.com/Patial-45)
- **LinkedIn**: [Sahil Patial](https://www.linkedin.com/in/sahil-patial-45/)
- **Instagram**: [@sahil_patial45](https://www.instagram.com/sahil_patial45/)
- **Email**: [patial2001@gmail.com](mailto:patial2001@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
