const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username : {
        type : String,
        unique: true,
        required : [true,'`{PATH}` alanı zorunludur.'],
        maxlength: [20,'`{PATH}` alanı (`{Value}`),({MAXLENGTH} karakterden küçük olmalıdır.)'],
        minlength: [1,'`{PATH}` alanı (`{Value}`),({MINLENGTH} karakterden büyük olmalıdır.)'] 
    },
    password: {type: String,minlength:3},
    createdAt: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('user',UserSchema);