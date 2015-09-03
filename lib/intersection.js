module.exports = function(arrayOne, arrayTwo) {

    var common = [];
    var obj = {};

    arrayOne.forEach(function(item){
        obj[item] = true;
    });

    arrayTwo.forEach(function(item){
        if (item in obj) {
            common.push(item);
        }
    });

    return common;

};
