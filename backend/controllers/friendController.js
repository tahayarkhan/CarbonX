import User from "../models/User.js";
import {mongoose, ObjectId} from 'mongoose';


// Send a friend request

export const sendFriendRequest = async (req, res) => {
    const { username } = req.body;
    const senderId = new mongoose.Types.ObjectId(req.user.id); // Assuming you're getting senderId from the authenticated user

    console.log(username)

    console.log(senderId)

    try {
        const recipient = await User.findOne({ username });

        if (!recipient) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure senderId is converted to an ObjectId (valid MongoDB ObjectId format)
        const senderObjectId = new mongoose.Types.ObjectId(senderId); 

        if (recipient.friends.includes(senderObjectId)) {
            return res.status(400).json({ message: "Already friends" });
        }

        if (recipient.friendRequests.includes(senderObjectId)) {
            return res.status(400).json({ message: "Request already sent" });
        }

        recipient.friendRequests.push(senderObjectId);
        await recipient.save();

        res.status(200).json({ message: "Friend request sent" });
    } catch (error) {
        console.error("Error in sending friend request:", error);
        res.status(500).json({ message: "Error sending request", error: error.message });
    }
};


// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) return res.status(404).json({ message: "User not found" });

        if (!user.friendRequests.includes(friendId))
            return res.status(400).json({ message: "No friend request from this user" });

        user.friends.push(friendId);
        friend.friends.push(userId);

        user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
        await user.save();
        await friend.save();

        res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
        res.status(500).json({ message: "Error accepting request", error: error.message });
    }
};

// Reject a friend request
export const rejectFriendRequest = async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
        await user.save();

        res.status(200).json({ message: "Friend request rejected" });
    } catch (error) {
        res.status(500).json({ message: "Error rejecting request", error: error.message });
    }
};

// Get friend list
export const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("friends", "name username profilePicture");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user.friends);
    } catch (error) {
        res.status(500).json({ message: "Error fetching friends", error: error.message });
    }
};

// Get friend requests
export const getFriendRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("friendRequests", "name username profilePicture");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user.friendRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching friend requests", error: error.message });
    }
};  
