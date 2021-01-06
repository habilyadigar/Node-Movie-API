const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id :Schema.Types.ObjectId,
    title: {
        type : String,
        required : [true,'`{PATH}` alanı zorunludur.'],
         maxlength: [20,'`{PATH}` alanı (`{Value}`),({MAXLENGTH} karakterden küçük olmalıdır.)'],
         minlength: [1,'`{PATH}` alanı (`{Value}`),({MINLENGTH} karakterden büyük olmalıdır.)'] 
    },
    category: {
        type: String,
        maxlength: [15,'`{PATH}` alanı (`{Value}`),({MAXLENGTH} karakterden küçük olmalıdır.)'],
        minlength: [2,'`{PATH}` alanı (`{Value}`),({MINLENGTH} karakterden büyük olmalıdır.)']
    },
    country : {
        type: String,
        maxlength: [15,'`{PATH}` alanı (`{Value}`),({MAXLENGTH} karakterden küçük olmalıdır.)'],
        minlength: [2,'`{PATH}` alanı (`{Value}`),({MINLENGTH} karakterden büyük olmalıdır.)']
    },
    year: {
        type: Number,
        max: 2020,
        min:1950
    },
    imdb_score: {
        type: Number,
        max:10,
        min:0.1
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie',MovieSchema);