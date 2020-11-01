const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DirectorSchema = new Schema({
    name : {
        type : String,
        required : [true,'`{PATH}` alanı zorunludur.'],
        maxlength: [20,'`{PATH}` alanı (`{Value}`),({MAXLENGTH} karakterden küçük olmalıdır.)'],
        minlength: [1,'`{PATH}` alanı (`{Value}`),({MINLENGTH} karakterden büyük olmalıdır.)'] 
    },
    surname: {type: String, maxlength:50,minlength:2},
    bio: {type: String,maxlength:500,minlength:10},
    createdAt: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('director',DirectorSchema);