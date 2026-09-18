const mongoose = require('mongoose');

const FJSchema = new mongoose.Schema({
    category: {
        type: String,
        default: "Programming & Tech"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    duration: {
        type: String,
        default: "1-3 months"
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        default: "500"
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
    },
    skills: {
        type: [String],
        default: ["React", "Node.js", "Full Stack"]
    },
    clientName: {
        type: String,
        default: "Verified Client"
    },
    clientEmail: {
        type: String,
        default: ""
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    proposals: [
        {
            freelancerName: String,
            freelancerEmail: String,
            bidAmount: Number,
            coverLetter: String,
            submittedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    status: {
        type: String,
        enum: ['open', 'in_progress', 'closed'],
        default: 'open'
    }
}, {
    timestamps: true
});

//* Collection Creation
const Jobs = mongoose.model('Jobs', FJSchema);

module.exports = Jobs;