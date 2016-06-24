var supertest =  require('supertest');
var mocha =  require('mocha');
var should =  require('should');
var request = supertest(require('../../app'));

describe('== VideosAPI 接口测试 ==', function() {

	it('POST - 视频 - 列表', function (done) {
	    request.post('/api/school/videos/2')
	      .end(function (err, res) {
	        should.not.exists(err);
	        res.status.should.equal(200);
	        res.body.status.should.equal('0');
	        done();
	      });
	});

	it('POST - 视频 - 详情', function (done) {
	    request.post('/api/school/videos/2/1')
	      .end(function (err, res) {
	        should.not.exists(err);
	        res.status.should.equal(200);
	        res.body.status.should.equal('0');
	        done();
	      });
	});

	// it('GET - 视频 - 列表', function (done) {
 //    	request.get('/school/videos/2')
	//       .end(function (err, res) {
	//         should.not.exists(err);
	//         res.status.should.equal(200);
	//         res.body.status.should.equal('0');
	//         done();
	//       });
	// });

	// it('GET - 视频 - 详情', function (done) {
	//     request.get('/school/videos/2/1')
	//       .end(function (err, res) {
	//         should.not.exists(err);
	//         res.status.should.equal(200);
	//         res.body.status.should.equal('0');
	//         done();
	//       });
	// });

});