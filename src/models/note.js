
const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema(
    {
    content: {
    type: String,
    required: true
    },
    author: {
    type: String,
    required: true
    },
    // add the favoriteCount property
    favoriteCount: {
    type: Number,
    default: 0
    },
    // add the favoritedBy property
    favoritedBy: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }
    ]
    },
    {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
    }
   );
   
const Note = mongoose.model('Note',noteSchema);
module.exports=Note;