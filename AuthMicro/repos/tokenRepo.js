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
            power: accountRef.power,
        }, process.env.PASS_SECRET);
        const tokenDB = new tokenModel({
            token,
            type: tokenType[1],
            account: accountRef._id,
        });
        await this.Save(tokenDB);
        return token;
    }

    async FindByAccountIdAndDestroy(accountID)
    {
        await this.DeleteAccessToken(accountID);
        await this.DeleteAccessToken(accountID);
    }

    async DeleteAccessToken(accountID)
    {
        await tokenModel.find().where('account').equals(accountID).where('type').equals('access').deleteMany();
    }

    async DeleteRefreshToken(accountID)
    {
        await tokenModel.find().where('account').equals(accountID).where('type').equals('refresh').deleteMany();
    }

    async Save(token)
    {
        await token.save();
    }
}

module.exports = TokenRepo;