const AccountRepo = require('../../Shared/Repos/accountRepo');
const PositionRepo = require('../../Shared/Repos/positionRepo');
const VisualRepo = require('../../Shared/Repos/visualRepos');
const bodyChecker = require('../../Shared/Utils/bodyArgumentChecker');
const { errors } = require('../../Shared/enums');
const { returnDBError, returnRegisterSuccess } = require('../../Shared/Utils/sendResponses');
const accRepo = new AccountRepo();
const posRepo = new PositionRepo();
const visRepo = new VisualRepo();

const accCreationArgs = {
    name: '',
}

const registerNewAccount = async function(req, res)
{
    const err = bodyChecker(req.body, accCreationArgs);

    if(err.length > 0)
    {
        const errMessage = errors['0'];
        res.send({
            errorCode: 0,
            errMessage,
            fields: err,
        });
        return;
    }

    let dbErr = null;
    let acc;
    let pos;
    let vis;

    try
    {
        acc = await accRepo.Create(req.body.name);
        pos = await posRepo.Create(acc);
        vis = await visRepo.Create(acc, 0);
    }
    catch (dbErrObj)
    {
        dbErr = dbErrObj.message;
    }

    if(dbErr != null)
    {
        returnDBError(res);
        return;
    }

    await accRepo.Save(acc);
    await posRepo.Save(pos);
    await visRepo.Save(vis);

    returnRegisterSuccess(res, 'Successfully created account, now you can log in.', acc);

}

const updateAccount = async function(req, res)
{

}

const deleteAccount = async function(req, res)
{

}

const getAccountDetails = async function (req, res)
{

}

module.exports = {
    registerNewAccount,
    getAccountDetails
}