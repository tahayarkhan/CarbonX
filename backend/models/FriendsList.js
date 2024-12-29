const mongoose = require('mongoose')

const friendsListSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    friends: {type: Array, required: true}
});


const FriendsList = mongoose.model('FriendsList', friendsListSchema );

module.exports = FriendsList ;
