const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 4000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));
const jwtSecretKey = fs.readFileSync('/Users/jonakapaj/covid-19/src/server/secret_key.txt', 'utf-8');

mongoose.connect('mongodb+srv://jonakapajj:jona@cluster0.nurrtgd.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidHostnames: true,
});

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    favorites: [String]
});

const User = mongoose.model('User', UserSchema);
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('No token provided.');

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token.');

        req.userId = decoded.id;
        next();
    });
};

function generateJWT(userId, userEmail) {
    const payload = {
        id: userId,
        email: userEmail
    };
    const options = {expiresIn: '1d'};
    return jwt.sign(payload, jwtSecretKey, options);
}

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });
        await user.save();
        const token = generateJWT(user._id, user.email);
        res.status(201).send({token});
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.get('/userDetails', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');
        res.json({
            email: user.email,
            username: user.username,
            favoriteCountries: user.favorites
        });
    } catch (error) {
        res.status(500).send('Error fetching user details');
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(401).send('Authentication failed');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send('Authentication failed');

        if (!user.username && req.body.username) {
            user.username = req.body.username;
            await user.save();
        }

        const token = generateJWT(user._id, user.email);
        res.status(200).json({token});
    } catch (error) {
        res.status(500).send('Error authenticating user');
    }
});

app.get('/favorites', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');
        res.json(user.favorites);
    } catch (error) {
        res.status(500).send('Error fetching favorites');
    }
});

app.post('/favorites/add', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const {country} = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');
        if (!user.favorites.includes(country)) {
            user.favorites.push(country);
            await user.save();
        }
        res.json(user.favorites);
    } catch (error) {
        res.status(500).send('Error adding to favorites');
    }
});

app.post('/favorites/remove', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const {country} = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');
        const index = user.favorites.indexOf(country);
        if (index > -1) {
            user.favorites.splice(index, 1);
            await user.save();
        }
        res.json(user.favorites);
    } catch (error) {
        res.status(500).send('Error removing from favorites');
    }
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the COVID-19 Tracker API",
        version: "1.0.0",
        endpoints: [
            {
                method: "POST",
                path: "/register",
                description: "Register a new user"
            },
            {
                method: "POST",
                path: "/login",
                description: "Authenticate a user"
            },
            {
                method: "GET",
                path: "/userDetails",
                description: "Retrieve the details of a user",
                authentication: true
            },
        ]
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
