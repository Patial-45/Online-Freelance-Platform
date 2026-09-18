const mongoose = require('mongoose');

const FFSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    special: {
        type: String,
        default: "Full Stack Developer"
    },
    hours: {
        type: Number,
        default: 2
    },
    time: {
        type: String,
        default: "2-4 hrs"
    },
    price: {
        type: Number,
        required: true,
        default: 45
    },
    img: {
        type: String,
        default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    stars: {
        type: Number,
        default: 4.9
    },
    reviews: {
        type: Number,
        default: 12
    },
    skills: {
        type: [String],
        default: ["React", "JavaScript", "UI/UX"]
    },
    description: {
        type: String,
        default: "Senior specialist dedicated to delivering scalable, high-impact results."
    },
    location: {
        type: String,
        default: "Remote, Worldwide"
    },
    bookings: [
        {
            clientName: String,
            clientEmail: String,
            projectScope: String,
            preferredDate: String,
            status: {
                type: String,
                enum: ['pending', 'confirmed', 'declined'],
                default: 'pending'
            },
            bookedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

//* Collection Creation
const Freelancers = mongoose.model('Freelancers', FFSchema);

module.exports = Freelancers;