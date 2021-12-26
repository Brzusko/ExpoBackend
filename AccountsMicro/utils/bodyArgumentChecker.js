module.exports = function(obj, args)
{
    errors = [];
    Object.keys(args).forEach(key => {
        if(!(key in obj)) errors.push(key);
    })
    return errors;
}