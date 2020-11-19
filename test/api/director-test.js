const chai = require('chai');
const  chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('TESTing directors', ()=>{
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
describe('GETTing all directors', ()=>{
    it('should getting all directors',(done)=>{
        chai.request(server)
            .get('/api/directors')
            .set('x-access-token',token)
            .end((err,res)=>{
                //console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    })
});

describe('POSTing director', ()=>{
    it('it should Post a director',(done)=>{
        const director = {
            name: 'Quentin',
            surname: 'Tarantino',
            bio: 'Pulp Fiction',
        }
        chai.request(server)
            .post('/api/directors')
            .send(director)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('surname');
                res.body.should.have.property('bio');
                directorId = res.body._id;
                console.log(res.body)
                done();
            });
    })
});

describe('GETTing Director with id' ,()=>{
    it ('it should GET a director by the given id',(done) =>{
        chai.request(server)
            .get('/api/directors/'+ directorId )
            .set('x-access-token', token)
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
               // res.body.should.have.property('name');
                //res.body.should.have.property('surname');
                //res.body.should.have.property('bio');
               // res.body.should.have.property('_id').equal(directorId);
                done();
            });
    });
});

describe('PUTting director_id', ()=>{
    it('it should UPDATE a director given by id',(done)=>{
        const director = {
            name: 'Martin',
            surname: 'Scorsese',
            bio: 'the wolf of wall street',
        }
        chai.request(server)
            .put('/api/directors/'+ directorId )
            .send(director)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(director.name);
                res.body.should.have.property('surname').eql(director.surname);
                res.body.should.have.property('bio').eql(director.bio);
                done();
            });
    })
});

describe('DELETEing director_id', ()=>{
    it('it should DELETE a director given by id',(done)=>{
        chai.request(server)
            .delete('/api/directors/'+ directorId)
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