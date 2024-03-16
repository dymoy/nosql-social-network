const { User, Thought } = require('../../models');

const thoughtData = [
    "Here's a cool thought...",
    "Thoughts are the words of our minds.",
    "You'll never guess what happened to me today...",
    "I was thinking the other day that...",
    "I just had a random thought. Has anyone looked into...",
];

const userData = [
    'ajackson',
    'kitty123',
    'nclark',
    'daniel444',
    'robert23'
];

const createThoughts = async () => {
    for (var i = 0; i < thoughtData.length; i++) {
        // Find the User by username
        const user = await User.findOne({ username: userData[i] })
            .select('-__v');
        
        // Create the Thought instance 
        const thought = await Thought.create({
            "thoughtText": thoughtData[i],
            "username": user.username,
            "userId": user._id.valueOf()
        });

        // Add the new thought to the user.thoughts array
        await User.findOneAndUpdate(
            { _id: user._id },
            { $push: { thoughts: thought._id }},
            { new: true }
        );
    }
}

module.exports = { createThoughts }