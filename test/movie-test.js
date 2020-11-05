//unit test//
const chai = require('chai');
const  chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token, movieId;

describe('TESTing movies', ()=>{
    before((done )=>{
        chai.request(server)
            .post('/authenticate')
            .send({username: 'hyadigar159', password: '123456789'})
            .end((err,res) =>{
                token= res.body.token;
                console.log('TOKEN:'+token);
                done();
            });     
    });

describe('GETTing all movies', ()=>{
        it('Bütün filmlerin gelmesi gerek',(done)=>{
            chai.request(server)
                .get('/api/movie')
                .set('x-access-token',token)
                .end((err,res)=>{
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
});

describe('POSTing movies', ()=>{
        it('it should Post a movie',(done)=>{
            const movie = {
                title: 'film123',
                director_id: '5f9edb6aa6204d1b40b74a5b',
                category: 'Comedy',
                country: 'TR',
                year: 2015,
                imdb_score: 8.6
            }
            chai.request(server)
                .post('/api/movie')
                .send(movie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieId = res.body._id;
                    done();
                });
        })
});

describe('GETTing Director with id' ,()=>{
    it ('it should GET a movie by the given id',(done) =>{
        chai.request(server)
            .get('/api/movie/'+ movieId)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                //console.log(res.body);
                res.body.should.be.a('object')
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                res.body.should.have.property('_id').eql(movieId);
                done();
            });
    });
});

describe('PUTting director_id', ()=>{
    it('it should UPDATE a movie given by id',(done)=>{
        const movie = {
            title: 'updatedeneme',
            director_id: '5f9edb6aa6204d1b40b74a5b',
            category: 'Cars',
            country: 'USA',
            year: 2017,
            imdb_score: 8.0
        }
        chai.request(server)
            .put('/api/movie/'+ movieId)
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(movie.title);
                res.body.should.have.property('director_id').eql(movie.director_id);
                res.body.should.have.property('category').eql(movie.category);
                res.body.should.have.property('country').eql(movie.country);
                res.body.should.have.property('year').eql(movie.year);
                res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                done();
            });
    })
});

describe('DELETEing director_id', ()=>{
    it('it should DELETE a movie given by id',(done)=>{
        chai.request(server)
            .delete('/api/movie/'+ movieId)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                done();
            });
    })
});

});

//Director route'un testlerini yaz