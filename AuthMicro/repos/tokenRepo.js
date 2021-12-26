const jwt = require('jsonwebtoken');
const tokenModel = require('../schemas/token');
const { tokenType } = require('../enums');

const accessTokenLast = '1h';

class TokenRepo
{
    constructor()
    {

    }

    async CreateAccessToken(accountRef)
    {
        const token = await jwt.sign({
            name: accountRef.name,
            _id: accountRef._id,
            power: accountRef.power
        }, process.env.PASS_SECRET, { expiresIn: accessTokenLast});
        const tokenDB = new tokenModel({
            token,
            type: tokenType[0],
            account: accountRef._id
        });
        await this.Save(tokenDB);
        return token;
    }

    async CreateRefreshToken(accountRef)
    {
        const token = await jwt.sign({
            name: accountRef.name,
            _id: accountRef._id,
            pinCode: accountRef.pinCode
        }, process.env.PASS_SECRET);
        const tokenDB = new tokenModel({
            token,
            type: tokenType[1],
            account: accountRef._id,
        });
        await this.Save(tokenDB);
        return token;
    }

    async ReplaceAccessToken(refreshToken)
    {

    }

    async FindByAccountIdAndDestroy(accountID)
    {
        await tokenModel.find().where('account').equals(accountID).deleteMany();
    }

    async Save(token)
    {
        await token.save();
    }
}

module.exports = TokenRepo;