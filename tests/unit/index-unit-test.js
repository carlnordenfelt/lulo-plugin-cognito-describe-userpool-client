const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');

describe('Index unit tests', function () {
    let subject;
    const describeUserPoolClientStub = sinon.stub();
    let event;

    before(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false,
        });

        const awsSdkStub = {
            CognitoIdentityServiceProvider: function () {
                this.describeUserPoolClient = describeUserPoolClientStub;
            },
        };

        mockery.registerMock('aws-sdk', awsSdkStub);
        subject = require('../../src/index');
    });
    beforeEach(function () {
        describeUserPoolClientStub.reset();
        describeUserPoolClientStub.yields(undefined, { UserPoolClient: { ClientSecret: 'secret' } });
        event = {
            ResourceProperties: {
                UserPoolId: 'UserPoolId',
                ClientId: 'ClientId',
            },
        };
    });
    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('validate', function () {
        it('should succeed', function (done) {
            subject.validate(event);
            done();
        });
        it('should fail if UserPoolId is not set', function (done) {
            delete event.ResourceProperties.UserPoolId;
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property UserPoolId/);
            done();
        });
        it('should fail if KeyId is not set', function (done) {
            delete event.ResourceProperties.ClientId;
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property ClientId/);
            done();
        });
    });

    describe('create', function () {
        it('should succeed', function (done) {
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(describeUserPoolClientStub.calledOnce).to.equal(true);
                expect(response.ClientSecret).to.equal('secret');
                done();
            });
        });
        it('should fail due to AWS error', function (done) {
            describeUserPoolClientStub.yields('describeUserPoolClientStub');
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal('describeUserPoolClientStub');
                expect(describeUserPoolClientStub.calledOnce).to.equal(true);
                expect(response).to.equal(undefined);
                done();
            });
        });
    });

    describe('update', function () {
        it('should succeed', function (done) {
            subject.update(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(describeUserPoolClientStub.calledOnce).to.equal(true);
                expect(response.ClientSecret).to.equal('secret');
                done();
            });
        });
    });

    describe('delete', function () {
        it('should succeed', function (done) {
            subject.delete(event, {}, function (error) {
                expect(error).to.equal(undefined);
                expect(describeUserPoolClientStub.called).to.equal(false);
                done();
            });
        });
    });
});
