const chai = require('chai');
const  chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token;

describe('/api/movie tests', ()=>{
    before((done )=>{
        chai.request(server)
            .post('/authenticate')
            .send({username:'hyadigar159', password: '123456789'})
            .end((err,res) =>{
                token= res.body.token;
                console.log('TOKEN:'+token);
                done();
            });     
    });

    
    describe('GETTing movies', ()=>{
        it('Bütün filmlerin gelmesi gerek',(done)=>{
            chai.request(server)
                .get('/api/movie')
                .set('x-access-token',token)
                .end((err,res)=>{
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        })
    });

    describe('Movie posting', ()=>{
        it('it should Post a movie',(done)=>{
            const movie = {
                title: 'test12354',
                director_id: '5f9edb6aa6204d1b40b74a5b',
                category: 'Comedy',
                country: 'TR',
                year: 2015,
                imdb_score: 8.6
            }
            chai.request(server)
                .post('/api/movie')
                .send(movie)
                .set('x-acces-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    done();
                });
        })
    });
});

