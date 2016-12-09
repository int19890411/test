var util = {
    getLimit: function (page, user_count) {
        if (!isNaN(page)) {
            return (user_count * (page - 1)) + ", " + user_count;
        } else {
            return "0, " + user_count;
        }
    },
    randomInt: function (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    },
    promiseError: function (message, status) {
        return new Promise(function (resolve, reject) {
            var err = new Error(message);
            if (status) {
                err.status = status;
            }
            reject(err);
        });
    }
};
module.exports = util;