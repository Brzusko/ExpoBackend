const jwt = require('jsonwebtoken');
const { errors } = require('../../Shared/enums');

const accessGuard = function(...acceptedRoles)
{
    return async function(req, res, next)
    {
        if(!req.body.token) return res.sendStatus(401);
        let tokenVerify;
        try
        {
            tokenVerify = await jwt.verify(req.body.token, process.env.PASS_SECRET);
        }
        catch (err)
        {
            return res.sendStatus(401);
        }
        const roles = [...acceptedRoles];
        const roleMatch = roles.find(role => role === tokenVerify.power) === 0;
        if(!roleMatch) return res.sendStatus(401);
        next();
    }
}

module.exports = accessGuard;