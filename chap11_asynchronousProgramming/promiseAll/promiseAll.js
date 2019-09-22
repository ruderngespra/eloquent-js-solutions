function Promise_all(promisesArray) {
    return new Promise((resolve, reject) => {
        let result = [];
        if (result.length == promisesArray.length) {
            resolve(result);
        }
        promisesArray.forEach((element, index) => {
            element
                .then(promiseReturnValue => {
                    result.push([promiseReturnValue, index]);
                    if (result.length == promisesArray.length) {
                        resolve(
                            result
                                .sort((a, b) => {
                                    return a[1] - b[1];
                                })
                                .map(result => {
                                    return result[0];
                                })
                        );
                    }
                })
                .catch(promiseRejectionValue => {
                    reject(promiseRejectionValue);
                });
        });
    });
}

function soon(val) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 500);
    });
}

Promise_all([]).then(array => {
    console.log('This should be []:', array);
});

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
    console.log('This should be [1, 2, 3]:', array);
});

Promise_all([soon(1), Promise.reject('X'), soon(3)])
    .then(array => {
        console.log('array', array);
        console.log('We should not get here');
    })
    .catch(error => {
        if (error != 'X') {
            console.log('Unexpected failure:', error);
        }
    });

/* 

Solution Haverbeke:

The main advantage over my solution seems to be his more elegant
keeping track of index numbers in the array. I did not know something
like "results[i] = result" was possible.

function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let pending = promises.length;
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then(result => {
                    results[i] = result;
                    pending--;
                    if (pending == 0) resolve(results);
                })
                .catch(reject);
        }
        if (promises.length == 0) resolve(results);
    });
}

*/
