const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require('../model/userSchema');


// router.get('/', (req, res) => {
//     res.send('Hello world from the router js');
// })

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, cpassword, role, title, special, time, price, description, skills, img } = req.body;

        if (!name || !email || !password) {
            return res.status(422).json({ error: "Please provide name, email, and password." });
        }

        if (cpassword && password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const userExist = await User.findOne({ email: normalizedEmail });

        if (userExist) {
            return res.status(422).json({ error: "Email already registered." });
        }

        const user = new User({
            name: name.trim(),
            email: normalizedEmail,
            phone: phone || "",
            password,
            role: role || "freelancer",
            title: title || (role === "client" ? "Hiring Manager" : "Freelance Specialist"),
            special: special || "",
            time: time || "Flexible",
            price: price || 50,
            description: description || "",
            skills: Array.isArray(skills) ? skills : (skills ? skills.split(",").map(s => s.trim()) : []),
            img: img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
        });

        await user.save();
        const token = await user.generateAuthToken();

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("jwtoken1", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                title: user.title,
                img: user.img,
                skills: user.skills
            }
        });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ error: "Registration failed. Please try again.", details: err.message });
    }
});

// Login Route
router.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please enter both email and password." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const userLogin = await User.findOne({ email: normalizedEmail });

        if (!userLogin) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        // Verify password BEFORE generating or sending token
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = await userLogin.generateAuthToken();

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("jwtoken1", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User SignIn Successfully",
            token,
            user: {
                _id: userLogin._id,
                name: userLogin.name,
                email: userLogin.email,
                role: userLogin.role,
                title: userLogin.title,
                img: userLogin.img,
                skills: userLogin.skills,
                price: userLogin.price,
                stars: userLogin.stars,
                reviews: userLogin.reviews
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Login failed. Please try again.", details: err.message });
    }
});

// User Profile / Current User routes
router.get('/profile', authenticate, (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.rootUser
    });
});

router.get('/getdata', authenticate, (req, res) => {
    return res.status(200).json(req.rootUser);
});

router.get('/Findjobs', authenticate, (req, res) => {
    return res.status(200).json(req.rootUser);
});

router.get('/FindFreelancer', authenticate, (req, res) => {
    return res.status(200).json(req.rootUser);
});

router.get('/Logout', (req, res) => {
    res.clearCookie('jwtoken1', { path: '/' });
    res.clearCookie('token', { path: '/' });
    return res.status(200).json({ message: "User Logout Successfully" });
});

module.exports = router;


//* HTTPS Status codes ==> https://developer.mozilla.org/en-US/docs/Web/HTTP/Status