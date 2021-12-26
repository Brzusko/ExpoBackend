const accountModel = require('../schemas/account');

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
        return accountModel.findOneAndUpdate({ name: oldUserName }, { name: newUserName, pinCode, power});
    }

    async GetByName()
    {

    }

    async GetByToken()
    {

    }

    async Delete(userName)
    {

    }

    async Save(account)
    {
        await account.save();
    }
}

module.exports = AccountRepo;