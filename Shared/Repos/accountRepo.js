const accountModel = require('../Schemas/account');
const randInt = require('../../Shared/Utils/randomInt');

class AccountRepo
{
    constructor()
    {

    }

    async Create(userName)
    {
        const account = await accountModel.findOne().where('name').equals(userName);
        if(account != null) throw new Error('Cannot create account with these credentials');

        const newAccount = new accountModel (
            {
                name: userName,
                pinCode: randInt(1000, 9999),
            }
        );
        return newAccount;
    }

    async UpdateByUserName(userName, update)
    {
        return accountModel.findOneAndUpdate({ name: userName }, update);
    }

    async GetByName(userName)
    {
        return accountModel.findOne().where('name').equals(userName);
    }

    async Delete(userName)
    {
        await accountModel.findByIdAndDelete().where('name').equals(userName);
    }

    async Save(account)
    {
        await account.save();
    }
}

module.exports = AccountRepo;