const accountModel = require('../schemas/account');

class AccountRepo
{
    constructor()
    {

    }

    async Create(userName, pinCode)
    {
        const account = await accountModel.findOne().where('name').equals(userName);
        if(account != null) return false;

        const newAccount = new accountModel (
            {
                name: userName,
                pinCode,
            }
        );

        const result = await newAccount.save();
        return result != null;
    }

    async UpdateByUserName(oldUserName, newUserName, pinCode, power)
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
}

module.exports = AccountRepo;