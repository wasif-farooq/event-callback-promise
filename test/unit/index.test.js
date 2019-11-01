const { expect } = require('chai');
const sinon = require('sinon');
const { stub, fake, spy } = sinon;
const ecp = require('../../src/index');

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
            let func = ecp(() => {});
            expect(func).to.be.an('function');
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

    })

});