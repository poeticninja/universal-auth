module.exports = function(template, obj) {

    return template.replace(/{([^}]+)}/g, function ($0, chain) {

        var path = chain.split('.');

        for (var i = 0, length = path.length; i < length; ++i) {
            var key = path[i];
            if (key[0] === '-' && Array.isArray(obj)) {
                key = key.slice(1, key.length);
                key = obj.length - key;
            }

            if (!obj ||
                !obj.hasOwnProperty(key) ||
                typeof obj !== 'object') {

                console.log('Missing key', key, 'in template', chain);

                obj = null;

                break;
            }

            obj = obj[key];
        }

        return (obj === undefined || obj === null ? '' : obj);

    });
};
