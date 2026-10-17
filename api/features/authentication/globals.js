module.exports = {
    name: {
        singular: 'User',
        plural: 'users',
    },
    schema: {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
}