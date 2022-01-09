const { errors } = require('../enums');

const returnMissingCredentialsError = (res) => {
    const errorMessage = errors[2];
    res.status(201);
    res.send({
        errorCode: 2,
        errorMessage,
    });
}

const returnNotValidToken = (res) => {
    res.status(201);
    res.send({
        errorCode: 4,
        errorMessage: errors[4],
    })
}

const returnSuccess = (res, message) => {
    res.status(200);
    res.send({
        message
    });
}

const returnAuthSuccess = (res, message, authToken, refreshToken) =>
{
    res.status(200);
    res.send({
        message,
        credentials: { authToken, refreshToken }
    });
}

const returnAuthFailure = (res) => {
    const errorMessage = errors[3];
    res.status(201);
    res.send({
        errorCode: 3,
        errorMessage
    });
}

const returnDBError = (res) => {
    res.status(201);
    const errorMessage = errors[1];
    res.send({
        errorCode: 1,
        errorMessage,
    });
}

const returnAccessDenied = (res) => {
    res.status(201);
    res.send({
        errorCode: 5,
        errorMessage: errors[5],
    })
}

const returnRegisterSuccess = (res, mess, acc) => {
    res.status(200);
    res.send({
        message: mess,
        credentials: { name: acc.name, pinCode: acc.pinCode }
    })
}

module.exports = {
    returnSuccess,
    returnMissingCredentialsError,
    returnNotValidToken,
    returnAuthSuccess,
    returnAuthFailure,
    returnDBError,
    returnAccessDenied,
    returnRegisterSuccess
}