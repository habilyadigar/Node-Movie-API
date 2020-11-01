const express = require('express');
const router = express.Router();

//models

const Director = require('../models/Director');


router.get('/',(req, res)=>{
  const promise = Director.aggregate([
    {
      $lookup:{
        from :'movies',
        localField: '_id',
        foreignField: 'director_id',
        as : 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    
    {
      $group: {
        _id:{
          _id: '$id',
          name: '$name',
          surname: '$surname',
          bio : '$bio'
        },
        movies: {
          $push : '$movies'
        }
      }
    },
    
    {
      $project:{
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
    
]);

router.get('/',(req, res)=>{
  const promise = Director.find({ });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err)
  });
});



promise.then((data) =>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});


router.post('/', (req, res, next) =>{
  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});








module.exports = router;
