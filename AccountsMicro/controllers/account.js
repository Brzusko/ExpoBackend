const AccountRepo = require('../repos/accountRepo');
const PositionRepo = require('../repos/positionRepo');
const VisualRepo = require('../repos/visualRepos');
const bodyChecker = require('../utils/bodyArgumentChecker');
const { errors } = require('../enums');
const accRepo = new AccountRepo();
const posRepo = new PositionRepo();
const visRepo = new VisualRepo();

const accCreationArgs = {
    name: '',
    pinCode: 0,
    sex: 0,
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
        acc = await accRepo.Create(req.body.name, req.body.pinCode);
        pos = await posRepo.Create(acc);
        vis = await visRepo.Create(acc, req.body.sex);
    }
    catch (dbErrObj)
    {
        dbErr = dbErrObj.message;
    }

    if(dbErr != null)
    {
        const errMessage = errors['1'];
        res.send({
            errorCode: 1,
            errMessage,
            db: dbErr
        })
        return;
    }

    await accRepo.Save(acc);
    await posRepo.Save(pos);
    await visRepo.Save(vis);

    res.send({
        errorCode: -1,
        errMessage: 'Successfully created Account',
    });

}

const updateAccount = async function(req, res)
{

}

const deleteAccount = async function(req, res)
{

}

const getAccountDetails = async function (req, res)
{
    res.send('D');
}

module.exports = {
    registerNewAccount,
    getAccountDetails
}