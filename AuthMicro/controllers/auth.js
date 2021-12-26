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
    const tokenRepo = new TokenRepo();
    await tokenRepo.FindByAccountIdAndDestroy(user._id);
    const accessToken = await tokenRepo.CreateAccessToken(user);
    const refreshToken = await tokenRepo.CreateRefreshToken(user);
    res.status(200);
    res.send({
        errorCode: -1,
        errorMessage: 'Successfully logged in!',
        credentials: {
            accessToken,
            refreshToken
        }
    });
};

const loginWithRefreshToken = async (req, res) => {

};

const logout = async (req, res) => {
    const { credentials } = req.body;
    if(!credentials)
    {
        returnMissingCredentialsError(res);
        return;
    }
    const tokenRepo = new TokenRepo();
    
};

module.exports = {
    loginWithCredentials,
    loginWithRefreshToken,
}