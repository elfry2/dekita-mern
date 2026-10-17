const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Model = require("./model");

const register = async function (request, response) {
    const { username, password } = request.body;

    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

    try {
        if (!username) {
            throw Error('Username is required');
        }

        if(!usernamePattern.test(username)) {
            throw Error('Username is invalid');
        }
        
        if (!password) {
            throw Error('Password is required');
        }

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        const token = jwt.sign(username, process.env.SECRET);

        const document = await Model.create({ username, password: hash });

        const body = {
            username: document.username,
            token: token,
        };

        return response.status(200).json(body);
    }

    catch (error) {
        return response.status(400).json({ error: error.message });
    }
};

const login = async function (request, response) {
    const { username, password } = request.body;

    try {
        if (!username) {
            throw Error('Username is required');
        }
        
        if (!password) {
            throw Error('Password is required');
        }

        const document = await Model.findOne({username});
        
        if (!document) {
            throw Error('Invalid username or password');
        }
        
        const isAuthenticated = await bcrypt.compare(password, document.password);

        if (!isAuthenticated) {
            throw Error('Invalid username or password');
        }

        const token = jwt.sign(username, process.env.SECRET);

        const body = {
            username: document.username,
            token: token,
        };

        return response.status(200).json(body);
    }

    catch (error) {
        return response.status(400).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
};