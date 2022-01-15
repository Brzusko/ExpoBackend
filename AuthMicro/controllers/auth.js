const jwt = require('jsonwebtoken');
const AccRepo = require('../../Shared/Repos/accountRepo');
const TokenRepo = require('../../Shared/Repos/tokenRepo');
const { returnMissingCredentialsError, returnAuthSuccess, returnSuccess, returnAuthFailure, returnNotValidToken } = require('../../Shared/Utils/sendResponses');

const login = async (res, user, fromRefToken) => {
    const tokenRepo = new TokenRepo();
    const accessToken = await tokenRepo.CreateAccessToken(user);
    let refreshToken;
    if(!fromRefToken) refreshToken = await tokenRepo.CreateRefreshToken(user);
    returnAuthSuccess(res, 'Successfully logged in', accessToken, refreshToken);
}

const loginWithCredentials = async (req, res) => {
    const { name, pinCode } = req.body;
    if(!name || !pinCode)
    {
        returnMissingCredentialsError(res);
        return;
    }

    const accRepo = new AccRepo();
    const user = await accRepo.GetByName(name);
    if(!user || user.pinCode !== pinCode )
    {
        returnAuthFailure(res);
        return;
    }
    await login(res, user, false);
};

const loginWithRefreshToken = async (req, res) => {
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
    const id = tokenVerify._id;
    await tokenRepo.DeleteAccessToken(id);
    await tokenRepo.DeleteRefreshToken(id);
    returnSuccess(res, 'Successfully logged out');
};

module.exports = {
    loginWithCredentials,
    loginWithRefreshToken,
    logout,
}