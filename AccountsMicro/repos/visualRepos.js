const visualModel = require('../schemas/visuals');

const sexMap = {
    0: 'Male',
    1: 'Female',
}

class VisualRepos
{
    constructor()
    {

    }

    async Create(accountRef, sexVis)
    {
        if(accountRef == null) throw new Error('Account is missing');
        let vis = await visualModel.findOne().where('account').equals(accountRef._id);
        if(vis != null) throw new Error('Cannot create another vis with that account');
        if(!(sexVis.toString() in sexMap)) throw new Error('Provided wrong sex enum');

        vis = new visualModel({
            sex: sexMap[sexVis],
            account: accountRef._id
        });

        return vis;
    }

    async Read(account)
    {

    }

    async Update(account, update)
    {

    }

    async Delete(account)
    {

    }

    async Save(visuals)
    {
        visuals.save();
    }
}

module.exports = VisualRepos;