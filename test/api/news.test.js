var supertest =  require('supertest');
var mocha =  require('mocha');
var should =  require('should');
var request = supertest(require('../../app'));

describe('== NewsAPI 接口测试 ==', function() {

	it('POST - 新闻 - 列表', function (done) {
	    request.post('/api/news/0')
	      .end(function (err, res) {
	        should.not.exists(err);
	        res.status.should.equal(200);
	        res.body.should.containEql({status: '0'});
	        done();
	      });
	});

	it('GET - 新闻 - 列表', function (done) {
	    request.post('/api/newss/0')
	      .end(function (err, res) {
	        should.not.exists(err);
	        console.log(res.body);
	        res.status.should.equal(404);
	        res.body.should.containEql({status: '1'});
	        done();
	      });
	});	
	// it('GET - 新闻 - 列表', function (done) {
	//     request.get('/news/0')
	//       .end(function (err, res) {
	//         should.not.exists(err);
	//         console.log(res.body);
	//         res.status.should.equal(200);
	//         res.body.should.containEql({status: '0'});
	//         done();
	//       });
	// });

	it('POST - 新闻 - 详情', function (done) {
	    request.post('/api/news/0/47')
	      .end(function (err, res) {
	        should.not.exists(err);
	        res.status.should.equal(200);
	        res.body.should.containEql({status: '0'});
	        res.body.data.should.containEql({id:47});
	        done();
	      });
	});

	// it('GET - 新闻 - 详情', function (done) {
	//     request.get('/news/0/47')
	//       .end(function (err, res) {
	//         should.not.exists(err);
	//         res.status.should.equal(200);
	//         res.body.should.containEql({status: '0'});
	//         res.body.data.should.containEql({id:47});
	//         done();
	//       });
	// });

});