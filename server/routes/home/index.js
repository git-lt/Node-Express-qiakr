var express = require('express');
var Route = express.Router();
var authoriz = require('../../middlerware/authorization');

// Controllers
var homeCtrl = require('./home');
var schoolCtrl = require('./school');
var homeAdminCtrl = require('./homeAdmin');

var newsCtrl = require('./news');
var videosCtrl = require('./videos');
var userCtrl = require('./user');

// API Routers
Route
	.post('/api/news/:tag?', newsCtrl.getList)
	.post('/api/news/:tag/id', newsCtrl.getDetail)
	.post('/api/news/create', newsCtrl.create)
	.post('/api/news/update', newsCtrl.update)
	.post('/api/news/updateStatus', newsCtrl.updateStatus)
	.post('/api/news/delete', newsCtrl.del)
	.post('/api/videos/create', videosCtrl.create)
	.post('/api/videos/delete', videosCtrl.del)
	.post('/api/videos/update', videosCtrl.update)
	.post('/api/videos/updateStatus', videosCtrl.updateStatus)
	.post('/api/videos/:type?', videosCtrl.getList)
	.post('/api/videos/:type/:id', videosCtrl.getDetail)
	.post('/api/user/login', homeAdminCtrl.doLogin)
	.post('/api/user/logout', homeAdminCtrl.doLogout);

// Frontend Routers
Route
	.get('/', homeCtrl.home)
	.get('/product', homeCtrl.product)
	.get('/facilitator', homeCtrl.facilitator)
	.get('/news/:tag?', homeCtrl.news)
	.get('/news/:tag/:id', homeCtrl.newsDetail)
	.get('/about', homeCtrl.about)
	.get('/join', homeCtrl.join)
	.get('/qa', homeCtrl.qa)
	.get('/school', schoolCtrl.school)
	.get('/school/videos/:type?', schoolCtrl.video)
	.get('/school/videos/:type/:id', schoolCtrl.videoDetail)
	.get('/home/admin', authoriz, homeAdminCtrl.home)
	.get('/home/login', homeAdminCtrl.login);


module.exports = Route;
