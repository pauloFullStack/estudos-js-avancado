/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function(promise1, promise2) {

        resultPromise1 = await promise1;
        resultPromise2 = await promise2;

        const result1 = await new Promise(resolve => setTimeout(() => resolve(resultPromise1), 20));
        const result2 = await new Promise(resolve => setTimeout(() => resolve(resultPromise2), 60));
        
        return result1 + result2; 

        
};


  addTwoPromises(Promise.resolve(2), Promise.resolve(5))
    .then(console.log); // 4
