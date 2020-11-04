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

    
    describe('/GET movies', ()=>{
        it('Bütün filmlerin gelmesi gerek',(done)=>{
            chai.request(server)
                .get('/api/movie')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    });
});