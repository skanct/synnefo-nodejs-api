var record = require('./record');
var should = require('should');
var fs = require('fs');
var path = require('path');
var config = JSON.parse(fs.readFileSync(path.normalize(__dirname + '/config.json', 'utf8')));

describe('Cyclades API', function() {
	var recorder = record('cyclades_api');
	before(recorder.before);
	var Cyclades = require('../lib/cyclades');
	var api = new Cyclades(config.cyclades_endpoint, config.token);
	var server_id ;

	describe('Server test', function() {
		it('should list all servers', function(done) {
			api.serverList(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.property('servers')
				server_id = res.servers[0].id;
				done();
			});
		});
		it('should list all servers with details', function(done) {
			api.serverListDetail(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.property('servers')
				done();
			});
		});
		it('should get details for a server', function(done) {
			api.serverGet(server_id, function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.not.have.property('badRequest');
				res.should.have.propertyByPath('server', 'id');
				done();
			});
		});
		it('should not be able to get details for a server that does not exists', function(done) {
			api.serverGet(1, function(err, res) {
				should.exist(err);
				should.exist(res);
				err.should.have.property('status_code').above(399);
				res.should.not.have.property('server');
				done();
			});
		});
		it('should reboot a server ', function(done) {
			api.serverReboot(server_id, function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.not.have.property('badRequest');
				res.should.have.property('statusCode').below(400);
				done();
			});
		});
		it('should delete a server', function(done) {
			this.timeout(8000);
			api.serverDelete(server_id, function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.not.have.property('badRequest')
				res.should.have.property('statusCode').below(400);
                done();
			});
		});
		it('should create a server', function(done) {
			this.timeout(30000);
			var image_id = 'fdf769a6-928b-414c-9051-5458fa1c65c6';
			var flavor_id = '2414'; // 512MB, 5G, 1
			var name = 'test-22';
			var optionals = {};
			api.serverCreate(name, image_id, flavor_id, optionals, function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.not.have.property('badRequest')
				res.should.have.propertyByPath('server', 'id')
				res.should.have.propertyByPath('server', 'name').eql('test-22');
				res.should.have.propertyByPath('server', 'image', 'id').eql('fdf769a6-928b-414c-9051-5458fa1c65c6');
				res.should.have.propertyByPath('server', 'flavor', 'id').eql(2414)
				done();
			});
		});
		it('should not delete a server that does not exists', function(done) {
			this.timeout(8000);
			api.serverDelete(server_id + 10000	, function(err, res) {
				should.exist(err);
				should.exist(res);
				err.should.have.property('status_code').above(399);
                done();
			});
		});
	});

	var image_id;
	describe('Image test', function() {    
		it('should get all images', function(done) {
			this.timeout(8000);
			api.imageList(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.property('images');
				image_id = res.images[0].id;
				done();
			});
		});
		it('should get all images with details', function(done) {
			this.timeout(8000);
			api.imageListDetail(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.property('images');
				done();
			});
		});
		it('should get details for an image', function(done) {
			api.imageGet(image_id, function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.property('image');
				res.should.have.propertyByPath('image', 'id').eql(image_id);
				done();
			});
		});
	});
	
	// describe('SSH test', function() {    
	// 	it('should get all sshKeys', function(done) {
	// 		api.sshKeyGetAll(done);
	// 	});
	// });
	
	var flavor_id;

	describe('Flavor test', function() {    
		it('should get all flavors', function(done) {
			this.timeout(8000);
			api.flavorList(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.property('flavors');
				flavor_id = res.flavors[0].id;
				done();
			});
		});
		it('should get all flavors with details', function(done) {
			this.timeout(8000);
			api.flavorListDetail(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.property('flavors');
				done();
			});
		});
		it('should get details for a flavor', function(done) {
			api.flavorGet(flavor_id, function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.property('flavor');
				res.should.have.propertyByPath('flavor', 'id').eql(flavor_id);
				done();
			});
		});
	});
	
	// describe('Domain test', function() {    
	// 	it('should get all domains', function(done) {
	// 		api.domainGetAll(done);
	// 	});
	// });
	after(recorder.after);
});