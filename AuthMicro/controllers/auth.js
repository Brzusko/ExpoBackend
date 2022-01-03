const jwt = require('jsonwebtoken');
const AccRepo = require('../repos/accountRepo');
const TokenRepo = require('../repos/tokenRepo');
const { errors } = require('../enums');

const returnMissingCredentialsError = (res) => {
    const errorMessage = errors[2];
    res.status(200);
    res.send({
        errorCode: 2,
        errorMessage,
    });
}

const returnNotValidToken = (res) => {
    res.status(200);
    res.send({
        errorCode: 4,
        errorMessage: errors[4],
    })
}

const returnSuccess = (res, message, data = undefined) => {
    res.status(200);
    res.send({
        errorCode: -1,
        errorMessage: message,
        data,
    });
}

const login = async (res, user, fromRefToken) => {
    const tokenRepo = new TokenRepo();
    const accessToken = await tokenRepo.CreateAccessToken(user);
    let refreshToken;
    if(!fromRefToken) refreshToken = await tokenRepo.CreateRefreshToken(user);
    returnSuccess(res, 'Successfully logged in', {accessToken, refreshToken});
}

const loginWithCredentials = async (req, res) => {
    const { credentials } = req.body;
    if(!credentials)
    {
        returnMissingCredentialsError(res);
        return;
    }

    const accRepo = new AccRepo();
    const user = await accRepo.GetByName(credentials.name);
    if(!user || user.pinCode !== credentials.pinCode )
    {
        const errorMessage = errors[3];
        res.status(200);
        res.send({
           errorCode: 3,
           errorMessage
        });
        return;
    }
    await login(res, user, false);
};

const loginWithRefreshToken = async (req, res) => {
    res.status(200);
    if(!req.body.token)
    {
        returnMissingCredentialsError(res);
        return;
    }
    let tokenVerify;
    try
    {
        tokenVerify = await jwt.verify(req.body.token, process.env.PASS_SECRET);
    }
    catch(err)
    {
        returnNotValidToken(res);
        return;
    }
    const user = {
        name: tokenVerify.name,
        _id: tokenVerify._id,
        power: tokenVerify.power,
    }
    await login(res, user, true);
};

const logout = async (req, res) => {
    if(!req.body.token)
    {
        returnMissingCredentialsError(res);
        return;
    }
    const tokenRepo = new TokenRepo();
    let tokenVerify;
    try
    {
        tokenVerify = await jwt.verify(req.body.token, process.env.PASS_SECRET);
    }
    catch(err)
    {
        returnNotValidToken(res);
        return;
    }
    await tokenRepo.DeleteAccessToken(tokenVerify._id);
    returnSuccess(res, 'Successfully logged out');
};

module.exports = {
    loginWithCredentials,
    loginWithRefreshToken,
    logout,
}