const register = function (request, response) {
    return response.status(200).json({path: 'register'});
};

const login = function (request, response) {
    return response.status(200).json({path: 'login'});
};

module.exports = {
    register,
    login,
};