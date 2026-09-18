const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Load environment variables (.env in Server directory or config.env)
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, 'config.env') });

const PORT = process.env.PORT || 5000;
require('./db/conn.js');

const Authenticate = require('./middleware/authenticate');
const User = require('./model/userSchema');
const FJSchema = require('./model/FJSchema');
const FFSchema = require('./model/FFSchema');
const authRouter = require('./router/auth');

const app = express();

// Configure CORS for local dev and live Vercel deployments
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        const allowed = [
            process.env.BASE_URL,
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:5000"
        ];
        if (allowed.includes(origin) || origin.endsWith(".vercel.app") || origin.includes("localhost")) {
            return callback(null, true);
        }
        return callback(null, true); // Permissive in dev, credentials supported
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization,Accept"
}));

// HTTP Security Headers Middleware (OWASP & Cloudflare alignment)
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
});

app.use(express.json());
app.use(cookieParser());

// Mount Auth routes under both /api and root for maximum client compatibility
app.use('/api', authRouter);
app.use('/api/auth', authRouter);
app.use(authRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "healthy", timestamp: new Date().toISOString(), platform: "VectraWork 2026" });
});

app.get('/', (req, res) => {
    res.json({ message: "VectraWork API Gateway Active", version: "2026.1" });
});

// Seed Initial Curated Job Mandates across all 14 categories
const seedInitialJobs = async () => {
    try {
        const initialJobMandates = [
            {
                title: "Brand Identity, 3D Icon Set & Marketing Collateral",
                category: "Graphic Design",
                price: "1800",
                duration: "2-3 weeks",
                date: "Today",
                description: "Seeking a brand designer to craft our 2026 visual identity, design 25+ customized 3D vector icons in Blender/Illustrator, and create responsive social & marketing collateral for an AI developer platform.",
                image: "https://ik.imagekit.io/bhanu1776/Freelansters/graphic_design.png?updatedAt=1682608753579",
                skills: ["Branding", "3D Icons", "Illustrator", "Figma"],
                clientName: "Aura Creative Studio",
                clientEmail: "contact@aurastudio.io"
            },
            {
                title: "In-Depth Technical Documentation & API Architecture Guides",
                category: "Article Writing",
                price: "1400",
                duration: "3-4 weeks",
                date: "Yesterday",
                description: "Author comprehensive, interactive API reference guides, architectural case studies, and migration tutorials for our cloud infrastructure SDK.",
                image: "https://ik.imagekit.io/bhanu1776/Freelansters/article_writing.png?updatedAt=1682608757184",
                skills: ["Technical Writing", "API Docs", "Markdown", "Developer Relations"],
                clientName: "DevDocs Labs",
                clientEmail: "editorial@devdocs.co"
            },
            {
                title: "Cinematic Product Launch Video & Dynamic Motion Graphics",
                category: "Video Editing",
                price: "2200",
                duration: "2 weeks",
                date: "2 days ago",
                description: "Produce a high-energy 90-second product launch video featuring 3D animated device mockups, kinetic typography, sound design, and color grading for a new fintech mobile app.",
                image: "https://ik.imagekit.io/bhanu1776/Freelansters/video_editing.png?updatedAt=1682610666961",
                skills: ["After Effects", "Premiere Pro", "Motion Design", "Sound Design"],
                clientName: "Pulse Media",
                clientEmail: "media@pulse.io"
            },
            {
                title: "SaaS Financial Modeling, Tax Filing & Escrow Audit",
                category: "Accountant",
                price: "2600",
                duration: "1 month",
                date: "3 days ago",
                description: "Prepare institutional financial models, GAAP compliant P&L forecasts, cash burn projections, and milestone escrow reconciliations for our Series A funding round.",
                image: "https://ik.imagekit.io/bhanu1776/Freelansters/accountant.jpg?updatedAt=1682608757258",
                skills: ["Financial Modeling", "GAAP Accounting", "Tax Strategy", "QuickBooks"],
                clientName: "Metric Advisors",
                clientEmail: "finance@metricadvisors.com"
            },
            {
                title: "Enterprise Android Tablet App with Offline SQLite & Biometric Auth",
                category: "Android Developer",
                price: "3800",
                duration: "1-2 months",
                date: "3 days ago",
                description: "Build an enterprise Android warehouse inventory tablet application using Kotlin and Jetpack Compose with background SQLite replication, QR/barcode scanning, and biometric lock.",
                image: "https://ik.imagekit.io/bhanu1776/Freelansters/android_developer.png?updatedAt=1682608757160",
                skills: ["Kotlin", "Jetpack Compose", "Room DB", "CameraX"],
                clientName: "OmniFlow Systems",
                clientEmail: "tech@omniflow.corp"
            },
            {
                title: "Global Product Catalog Standardization & CRM Data Migration",
                category: "Data Entry",
                price: "1100",
                duration: "2 weeks",
                date: "4 days ago",
                description: "Clean, deduplicate, and catalog over 15,000 SKU product specifications into HubSpot and Shopify with accurate metadata tagging and SEO descriptions.",
                image: "https://ik.imagekit.io/bhanu1776/Freelansters/data_entry.png?updatedAt=1682608753900",
                skills: ["Data Verification", "HubSpot", "Shopify", "Excel/Sheets"],
                clientName: "Global Retail Depot",
                clientEmail: "ops@globalretail.com"
            },
            {
                title: "Last-Mile Delivery Route Optimization & Dispatch Analytics",
                category: "Logistics",
                price: "3200",
                duration: "1-2 months",
                date: "4 days ago",
                description: "Implement vehicle routing algorithms and freight cost calculation pipelines to minimize transit delays and optimize regional distribution hub scheduling.",
                image: "https://ik.imagekit.io/bhanu1776/Freelansters/logistics.jpg?updatedAt=1682610667062",
                skills: ["Logistics Strategy", "Routing Algorithms", "Data Analysis", "Supply Chain"],
                clientName: "Vanguard Freight",
                clientEmail: "dispatch@vanguardfreight.com"
            },
            {
                title: "Fine-Tuned LLM Autonomous Agent for Customer Support",
                category: "AI & Machine Learning",
                price: "5500",
                duration: "2 months",
                date: "5 days ago",
                description: "Develop a domain-adapted RAG agent using LangChain, pgvector, and Claude 3.5 / OpenAI APIs with streaming response webhooks and human-in-the-loop escalation.",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
                skills: ["Python", "LangChain", "Vector DB", "OpenAI / Claude API"],
                clientName: "Nexus AI Ventures",
                clientEmail: "ai@nexusventures.ai"
            },
            {
                title: "Modern Next.js 15 & Node.js Scalable Platform Architecture",
                category: "Full Stack Development",
                price: "4500",
                duration: "1-2 months",
                date: "Today",
                description: "Architect high-performance SSR web platform with Next.js 15 App Router, Tailwind CSS, Prisma ORM, and automated CI/CD deployment on Vercel and AWS.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
                skills: ["Next.js 15", "React 19", "Node.js", "TypeScript", "Tailwind CSS"],
                clientName: "Aura Systems",
                clientEmail: "engineering@aurasystems.io"
            },
            {
                title: "Mobile FinTech Design System & Interactive Figma Component Library",
                category: "UI/UX & Product Design",
                price: "3400",
                duration: "1 month",
                date: "Yesterday",
                description: "Design accessible, responsive design tokens, payment flows, wallet dashboards, and micro-interactions in Figma adhering to iOS Human Interface and Material 3 standards.",
                image: "https://images.unsplash.com/photo-1581291518655-9523c93269e2?auto=format&fit=crop&w=600&q=80",
                skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
                clientName: "FinPulse Labs",
                clientEmail: "design@finpulse.co"
            },
            {
                title: "Multi-Region Kubernetes Cluster & Infrastructure as Code",
                category: "Cloud & DevOps",
                price: "4800",
                duration: "3 weeks",
                date: "2 days ago",
                description: "Deploy Terraform configurations, AWS EKS clusters across 2 regions, ArgoCD GitOps pipelines, and Datadog monitoring for sub-50ms latency global traffic.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
                skills: ["AWS", "Kubernetes", "Terraform", "Docker", "GitOps"],
                clientName: "CloudScale Global",
                clientEmail: "ops@cloudscale.net"
            },
            {
                title: "Telehealth Video Consultation & Patient Records Mobile App",
                category: "Mobile Apps (iOS & Flutter)",
                price: "4200",
                duration: "2 months",
                date: "3 days ago",
                description: "Develop a HIPAA-compliant cross-platform mobile app in Flutter with WebRTC video calling, appointment booking, digital prescriptions, and push notifications.",
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
                skills: ["Flutter", "Dart", "WebRTC", "Firebase", "iOS/Android"],
                clientName: "HealthCare Pulse",
                clientEmail: "mobile@healthcarepulse.org"
            },
            {
                title: "Smart Contract Security Audit & Penetration Testing",
                category: "Cybersecurity & Auditing",
                price: "6000",
                duration: "2-3 weeks",
                date: "4 days ago",
                description: "Conduct formal mathematical verification, reentrancy analysis, and gas optimization for Solidity DeFi smart contracts and web3 authorization endpoints.",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
                skills: ["Solidity", "Smart Contract Audit", "Slither", "Penetration Testing"],
                clientName: "Sentinel Security",
                clientEmail: "audit@sentinelsec.xyz"
            },
            {
                title: "High-ROI Growth Funnel & Technical SEO Architecture",
                category: "Digital Marketing & SEO",
                price: "2000",
                duration: "1 month",
                date: "5 days ago",
                description: "Restructure site schema markup, core web vitals, keyword clustering, and multi-channel acquisition funnels to accelerate organic client onboarding.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
                skills: ["Technical SEO", "Growth Strategy", "Google Analytics 4", "Conversion Funnels"],
                clientName: "GrowthSpurt Media",
                clientEmail: "growth@growthspurt.agency"
            }
        ];

        for (const mandate of initialJobMandates) {
            const exists = await FJSchema.findOne({ title: mandate.title });
            if (!exists) {
                await FJSchema.create(mandate);
            }
        }
        console.log("✅ Verified and seeded all 14 curated job mandates");
    } catch (err) {
        console.error("Seed jobs error:", err.message);
    }
};

// Seed Initial Verified Freelancers if database is empty
const seedInitialFreelancers = async () => {
    try {
        const count = await FFSchema.countDocuments();
        if (count === 0) {
            const initialFreelancers = [
                {
                    name: "Alex Rivera",
                    title: "Principal Frontend Architect",
                    special: "React, Next.js & Design Systems",
                    price: 85,
                    hours: 4,
                    time: "Available 30h/wk",
                    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
                    stars: 5.0,
                    reviews: 48,
                    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
                    description: "Former tech lead with 8+ years experience crafting world-class web applications and high-fidelity micro-interactions.",
                    location: "San Francisco, CA (Remote)"
                },
                {
                    name: "Sahil Patial",
                    title: "Full Stack Engineer & Cloud Specialist",
                    special: "MERN Stack, Serverless & GraphQL",
                    price: 75,
                    hours: 2,
                    time: "Available 40h/wk",
                    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
                    stars: 4.9,
                    reviews: 62,
                    skills: ["Node.js", "Express", "MongoDB", "React", "AWS"],
                    description: "Full-stack developer focused on robust API architectures, real-time communication, and production-grade deployments.",
                    location: "Remote / Worldwide"
                },
                {
                    name: "Elena Rostova",
                    title: "Senior Product Designer",
                    special: "UI/UX, Mobile & Web Design Systems",
                    price: 90,
                    hours: 3,
                    time: "Available 20h/wk",
                    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
                    stars: 5.0,
                    reviews: 37,
                    skills: ["Figma", "UX Research", "Prototyping", "Design Tokens"],
                    description: "Award-winning product designer helping startups scale from zero to millions of users with memorable, accessible UX.",
                    location: "Berlin, Germany (Remote)"
                },
                {
                    name: "Marcus Chen",
                    title: "AI Solutions & Backend Engineer",
                    special: "Python, FastAPI & LLM Integrations",
                    price: 95,
                    hours: 2,
                    time: "Available 25h/wk",
                    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
                    stars: 4.8,
                    reviews: 29,
                    skills: ["Python", "FastAPI", "PostgreSQL", "LangChain", "Docker"],
                    description: "Specialized in productionizing generative AI models, low-latency vector databases, and scalable microservices.",
                    location: "Toronto, Canada (Remote)"
                }
            ];
            await FFSchema.insertMany(initialFreelancers);
            console.log("✅ Seeded initial verified freelancers");
        }
    } catch (err) {
        console.error("Seed freelancers error:", err.message);
    }
};

setTimeout(() => {
    seedInitialJobs();
    seedInitialFreelancers();
}, 2000);

// ==========================================
// JOBS ENDPOINTS
// ==========================================

// Get All Jobs
const getJobsHandler = async (req, res) => {
    try {
        const { category, search } = req.query;
        let filter = {};

        if (category && category.toLowerCase() !== 'all') {
            filter.category = new RegExp(category, 'i');
        }

        if (search) {
            filter.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { skills: new RegExp(search, 'i') }
            ];
        }

        const jobs = await FJSchema.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: jobs, count: jobs.length });
    } catch (err) {
        console.error("JobsFetch error:", err);
        return res.status(500).json({ error: "Failed to fetch jobs", details: err.message });
    }
};

app.get('/api/jobs', getJobsHandler);
app.get('/api/JobsFetch', getJobsHandler);
app.get('/JobsFetch', getJobsHandler);

// Get Single Job by ID
app.get('/api/jobs/:id', async (req, res) => {
    try {
        const job = await FJSchema.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        return res.status(200).json({ success: true, data: job });
    } catch (err) {
        return res.status(500).json({ error: "Error fetching job details", details: err.message });
    }
});

// Post a New Job
const postJobHandler = async (req, res) => {
    try {
        const { title, description, category, price, duration, image, skills, clientName, clientEmail } = req.body;

        if (!title || !description) {
            return res.status(422).json({ error: "Title and description are required." });
        }

        const newJob = new FJSchema({
            title: title.trim(),
            description: description.trim(),
            category: category || "Programming & Tech",
            price: price ? String(price) : "500",
            duration: duration || "1-3 months",
            image: image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
            skills: Array.isArray(skills) ? skills : (skills ? skills.split(",").map(s => s.trim()) : ["Freelance"]),
            clientName: clientName || (req.rootUser ? req.rootUser.name : "Verified Client"),
            clientEmail: clientEmail || (req.rootUser ? req.rootUser.email : ""),
            postedBy: req.userId || null
        });

        const savedJob = await newJob.save();
        return res.status(201).json({ success: true, message: "Job posted successfully!", data: savedJob });
    } catch (err) {
        console.error("Post job error:", err);
        return res.status(500).json({ error: "Failed to post job", details: err.message });
    }
};

app.post('/api/jobs', Authenticate, postJobHandler);
app.post('/Jobs', Authenticate, postJobHandler);

// Submit Proposal for a Job
app.post('/api/jobs/:id/proposals', async (req, res) => {
    try {
        const { freelancerName, freelancerEmail, bidAmount, coverLetter } = req.body;
        const job = await FJSchema.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        job.proposals.push({
            freelancerName: freelancerName || "Anonymous Freelancer",
            freelancerEmail: freelancerEmail || "",
            bidAmount: bidAmount ? Number(bidAmount) : Number(job.price),
            coverLetter: coverLetter || "I am enthusiastic about applying for this project and deliver exceptional quality."
        });

        await job.save();
        return res.status(200).json({ success: true, message: "Proposal submitted successfully!", data: job });
    } catch (err) {
        return res.status(500).json({ error: "Failed to submit proposal", details: err.message });
    }
});

// ==========================================
// FREELANCERS ENDPOINTS
// ==========================================

// Get All Freelancers
const getFreelancersHandler = async (req, res) => {
    try {
        const { search } = req.query;
        let filter = {};

        if (search) {
            filter.$or = [
                { name: new RegExp(search, 'i') },
                { title: new RegExp(search, 'i') },
                { special: new RegExp(search, 'i') },
                { skills: new RegExp(search, 'i') }
            ];
        }

        const freelancers = await FFSchema.find(filter).sort({ stars: -1, reviews: -1 });
        return res.status(200).json({ success: true, data: freelancers, count: freelancers.length });
    } catch (err) {
        console.error("FreelancersFetch error:", err);
        return res.status(500).json({ error: "Failed to fetch freelancers", details: err.message });
    }
};

app.get('/api/freelancers', getFreelancersHandler);
app.get('/api/FreelancersFetch', getFreelancersHandler);
app.get('/FreelancersFetch', getFreelancersHandler);

// Get Single Freelancer by ID
app.get('/api/freelancers/:id', async (req, res) => {
    try {
        const freelancer = await FFSchema.findById(req.params.id);
        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }
        return res.status(200).json({ success: true, data: freelancer });
    } catch (err) {
        return res.status(500).json({ error: "Error fetching freelancer profile", details: err.message });
    }
});

// Create/Register Freelancer Profile
const postFreelancerHandler = async (req, res) => {
    try {
        const { name, title, special, hours, time, price, img, skills, description, location } = req.body;

        const newFreelancer = new FFSchema({
            name: name || (req.rootUser ? req.rootUser.name : "Professional Freelancer"),
            title: title || "Senior Specialist",
            special: special || "Full Stack Web Development",
            hours: hours ? Number(hours) : 2,
            time: time || "Flexible",
            price: price ? Number(price) : 50,
            img: img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            skills: Array.isArray(skills) ? skills : (skills ? skills.split(",").map(s => s.trim()) : ["React", "JavaScript"]),
            description: description || "Passionate about creating exceptional digital experiences.",
            location: location || "Remote, Worldwide"
        });

        const saved = await newFreelancer.save();
        return res.status(201).json({ success: true, message: "Freelancer profile created successfully", data: saved });
    } catch (err) {
        console.error("Post freelancer error:", err);
        return res.status(500).json({ error: "Failed to create freelancer profile", details: err.message });
    }
};

app.post('/api/freelancers', Authenticate, postFreelancerHandler);
app.post('/Freelancers', Authenticate, postFreelancerHandler);

// Book a Freelancer
app.post('/api/freelancers/:id/book', async (req, res) => {
    try {
        const { clientName, clientEmail, projectScope, preferredDate } = req.body;
        const freelancer = await FFSchema.findById(req.params.id);

        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }

        freelancer.bookings.push({
            clientName: clientName || "Valued Client",
            clientEmail: clientEmail || "",
            projectScope: projectScope || "General Project Consultation",
            preferredDate: preferredDate || "As soon as possible",
            status: "pending"
        });

        await freelancer.save();
        return res.status(200).json({ success: true, message: "Booking request sent to freelancer successfully!", data: freelancer });
    } catch (err) {
        return res.status(500).json({ error: "Failed to submit booking", details: err.message });
    }
});

// Protected Profile shortcut
app.get('/about', Authenticate, (req, res) => {
    res.json(req.rootUser);
});

// Start listening when executed directly
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 VectraWork API server running on port ${PORT}`);
    });
}

module.exports = app;
