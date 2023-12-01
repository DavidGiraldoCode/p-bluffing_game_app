export default function resolvePromise(promise, promiseState) {
    //? Optional Abort promise
    promiseState.promise = promise;
    promiseState.data = null;
    promiseState.error = null;

    function resolvePromiseACB(data) {
        if (promiseState.promise === promise) { //* Race condition
            promiseState.data = data;
            return promiseState.data;
        }
    }

    function errorHandlerACB(error) {
        if (promiseState.promise === promise)
            promiseState.error = error;
    }

    if (promise !== null)
        promise.then(resolvePromiseACB).catch(errorHandlerACB);

}