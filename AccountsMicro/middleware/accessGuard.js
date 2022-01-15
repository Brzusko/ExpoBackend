const jwt = require('jsonwebtoken');
const { returnAccessDenied } = require('../../Shared/Utils/sendResponses');

const accessGuard = function(...acceptedRoles)
{
    return async function(req, res, next)
    {
        if(!req.body.token)
        {
            returnAccessDenied(res);
            return;
        }
        let tokenVerify;
        try
        {
            tokenVerify = await jwt.verify(req.body.token, process.env.PASS_SECRET);
        }
        catch (err)
        {
            returnAccessDenied(res);
            return;
        }
        const roles = [...acceptedRoles];
        const roleMatch = roles.find(role => role === tokenVerify.power) === 0;
        if(!roleMatch)
        {
            returnAccessDenied(res);
            return;
        }
        next();
    }
}

module.exports = accessGuard;