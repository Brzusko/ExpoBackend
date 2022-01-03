const accountModel = require('../Schemas/account');

class AccountRepo
{
    constructor()
    {

    }

    async Create(userName, pinCode)
    {
        const account = await accountModel.findOne().where('name').equals(userName);
        if(account != null) throw new Error('Cannot create account with these credentials');

        const newAccount = new accountModel (
            {
                name: userName,
                pinCode,
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