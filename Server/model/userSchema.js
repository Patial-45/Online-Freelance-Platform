const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['freelancer', 'client', 'admin'],
        default: 'freelancer'
    },
    title: {
        type: String,
        default: "Freelance Professional"
    },
    special: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: "Flexible"
    },
    price: {
        type: Number,
        default: 50
    },
    description: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    },
    img: {
        type: String,
        default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    reviews: {
        type: Number,
        default: 0
    },
    stars: {
        type: Number,
        default: 5.0
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
}, {
    timestamps: true
});

//* Code for hashing the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    if (next) next();
});

//* For generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        const secret = process.env.SECRET_KEY || 'freelansters_jwt_secret_key_2026';
        const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, secret, { expiresIn: '7d' });
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        console.error("Error in generateAuthToken:", err);
        return null;
    }
};

//* Collection Creation
const User = mongoose.model('Users', userSchema);

module.exports = User;