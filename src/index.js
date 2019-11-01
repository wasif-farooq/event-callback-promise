const ecp = (fn, event = null) => {

    // throws error if trying to promise the event call but but emitter doesn't implement Emitter class
    if (event && !event.on) {
        throw new Error('The event emitter should implement Emitter interface');
    }

    // checking if first paramerter is a function or not
    if (!event && (!fn || typeof fn !== 'function')) {
        throw new Error('first parameter should be a function')
    }

    return (...params) => {
        event ? new Promise((resolve, reject) => {

            const callback = (...data) => {
                resolve.apply(null, ...data);
            }
    
            const onError = (...data) => {
                reject.apply(null, ...data);
            }
    
            fn.on('error', onError);
            fn.on(event, callback);
    
        }) : new Promise((resolve, reject) => {
    
            const callback = (...receives) => {
                const [err, ...data] = receives;
                if (err) {
                    reject.call(fn, err);
                    return;
                }
    
                resolve.apply(fn, data);
            }
    
            params.push(callback);
    
            try {
                fn.apply(null, ...params);
            } catch (err) {
                reject(err);
            }
    
        })
    }
}

module.exports = ecp;