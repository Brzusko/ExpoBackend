const positionModel = require('../schemas/position');

class PositionRepo
{
    constructor()
    {

    }

    async Create(accountRef)
    {
        if(accountRef == null) throw new Error('Account is missing');
        let pos = await positionModel.findOne().where('account').equals(accountRef._id);
        if(pos != null) throw new Error('Cannot create another position for this account');
        pos = new positionModel({
            x: 0,
            y: 0,
            z: 0,
            account: accountRef._id
        });
        return pos;
    }

    async Update(account, update)
    {
        if(account == null) return new Error('Account is missing');
    }

    async Delete(account)
    {
        if(account == null) return new Error('Account is missing');
    }

    async ReadByAccount(account)
    {
        if(account == null) return new Error('Account is missing');
    }

    async ReadByAccountName(accountName)
    {

    }

    async Save(position)
    {
        await position.save();
    }


}

module.exports = PositionRepo;