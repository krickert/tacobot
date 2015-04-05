var should = require('should');

var tacobot	= require('../app/tacobot');
var responses = require('../app/responses');
var mock = require('../mock');

describe('Hip-Chat Webhook', function () {

	var fakeWebHook = JSON.parse(mock.hipChat.getHook());

    it('Should be able to determine the type of message based on the HipChat Hook message', function (done){

        done();
    });

	it('Should respond with the correct message type based on HipChat Hook content', function (done) {

		tacobot.roomEvent(fakeWebHook)
            .always(function(resp){

                should.exist(resp);
                should.not.exist(resp.error);

                resp.should.be.an.object;
                resp.should.have.property('color').which.is.a.string;
                resp.should.have.property('message_prefix').which.is.a.string;
                resp.should.have.property('message').which.is.a.string;
                resp.should.have.property('notify').which.is.a.boolean;
                resp.should.have.property('message_format').which.is.a.string;
                done();

            });

	});

	it('Should return a message type "Says"', function (done) {

		var responseType = responses[0].type;
		var response = tacobot.buildStaticResponse(fakeWebHook, responseType);

		response.should.be.an.object;
        response.should.have.property('color').which.is.a.string;
		response.should.have.property('message_prefix').which.is.a.string;
		response.should.have.property('message').which.is.a.string;
		response.should.have.property('notify').which.is.a.boolean;
		response.should.have.property('message_format').which.is.a.string;

		done();

	});


	it('Should return a message type "Fact"', function (done) {

		var responseType = responses[1].type;

		var message = tacobot.buildStaticResponse(fakeWebHook, responseType);

		message.should.be.an.object;
		message.should.have.property('color').which.is.a.string;
		message.should.have.property('message_prefix').which.is.a.string;
		message.should.have.property('message').which.is.a.string;
		message.should.have.property('notify').which.is.a.boolean;
		message.should.have.property('message_format').which.is.a.string;		

		done();

	});


	it('Should return a message type "Image"', function (done) {

		var responseType = responses[2].type;

		var message = tacobot.buildStaticResponse(fakeWebHook, responseType);

		message.should.be.an.object;
		message.should.have.property('color').which.is.a.string;
		message.should.have.property('message_prefix').which.is.a.string;
		message.should.have.property('message').which.is.a.string;
		message.should.have.property('notify').which.is.a.boolean;
		message.should.have.property('message_format').which.is.a.string;		

		done();

	});

	it('Should not return a response if the event type does not match', function (done) {
		
		var fakeWebHook = {
			'event': 'room_enter'
		};

		tacobot.roomEvent(fakeWebHook).always(function (resp) {

			should.exist(resp.error);
            resp.error.should.be.a.string;
			done();

		});		

	});

});