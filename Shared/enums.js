const errors = {
    0: 'Missing properties',
    1: 'Database Error',
    2: 'Missing credentials',
    3: 'Wrong username or pin code',
    4: 'Token is not valid',
}

const tokenType = {
    0: 'access',
    1: 'refresh',
}

const powerRoles = {
    0: 'guest',
    1: 'banned',
    2: 'owner'
}

module.exports = {
    errors,
    tokenType
}