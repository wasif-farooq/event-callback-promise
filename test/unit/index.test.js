const { expect } = require('chai');
const ecp = require('../../src/index');
const EventEmitter = require('events');


describe('test the ecp function', function() {

    describe('check the callback functions', function() {

        it('should thow error if not provide a parameter', function() {
            expect(() => {
                ecp()
            }).to.throw('first parameter should be a function');
        });

        it('should thow error if not pass the function', function() {
            expect(() => {
                ecp('')
            }).to.throw('first parameter should be a function');
        });

        it('should return a function', function() {
            let func = () => {};
            let pfunc = ecp(func);
            expect(pfunc).to.be.a('function');
        });

        it('should call then resolve function an return a value', function() {
            
            let func = (num, callback) => {
                callback(null, num);
            }

            let pfunc = ecp(func);

            pfunc(1).then((data) => {
                expect(data).to.be.equal(1);
            }).catch (() => {})
        });

        it('should call then reject function an return a value', function() {
            
            let func = (num, callback) => {
                callback(new Error('invalid number'));
            }

            let pfunc = ecp(func);

            pfunc(1)
            .then((data) => {})
            .catch ((err) => {
                expect(err).to.be.a('Error');
            })
        });
    });

    describe('check the event callback functions', function() {

        let emitter = null;
        let func = null;

        beforeEach(() => {
            emitter = new EventEmitter();
            func = ecp(emitter, 'data');
        });
        
        it('should thow error if not first parameter is not a emitter', function() {
            expect(() => {
                ecp(null, 'data');
            }).to.throw('The event emitter should implement Emitter interface');
        });

        it('should return a function', function() {
            expect(func).to.be.a('function');
        });

        it('should call then resolve function an return a value', function() {
            func(1).then((data) => {
                expect(data).to.be.equal(1);
            }).catch (() => {})

            emitter.emit('data', 1);
        });

        it('should call then resolve function an return a value', function() {
            func(1)
            .then((data) => {})
            .catch ((err) => {
                expect(err).to.be.a('Error');
            })

            emitter.emit('error', new Error('invalid number'));
        });
    });

});