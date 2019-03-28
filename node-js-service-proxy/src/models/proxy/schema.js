const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    encompassBody: {
        type: String,
        required: [false],
    },
    encompassMethod: {
        type: String,
        required: [true],
    },
    encompassUri: {
        type: String,
        required: [true],
    },
    fairwayUserName: {
        type: String,
        required: [true],
    }
});

module.exports = {
    schema
};