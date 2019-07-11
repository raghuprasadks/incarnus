//https://itnext.io/javascript-promises-vs-rxjs-observables-de5309583ca2
console.log('Observable : Promise');
/*
// async await
function asyncTask(i) {
    return 
new Promise(resolve => resolve(i + 1));
}
async function runAsyncTasks() {
    const res1 = 
await asyncTask(0);
    const res2 = 
await asyncTask(res1);
    const res3 = 
await asyncTask(res2);
    return "Everything done"
}
runAsyncTasks().then(result => console.log(result));




/* promise **/
/*
// Creation
const promise = new Promise(executorFunc);
function executorFunc(resolve, reject) {
    const value = Math.random();
    console.log('value :',value);
    if (value <= 1/3.0)
        resolve(value);
    else if (value <= 2/3.0)
        reject("Value <= 2/3 (reject)");
    else
        throw "Value > 2/3 (throw)"
}
// Usage
promise.then(onFulfilled).catch(onRejected);
function onFulfilled(value) {
    console.log("Got value: " + value);
}
function onRejected(error) {
    console.log("Caught error: " + error);
}

*/
/** observable **/

//import { Observable } from 'rxjs';
const { Observable } = require('rxjs');

// Creation
const observable = new Observable(subscriberFunc);
function subscriberFunc(observer) {
    const value = Math.random();
    console.log('observable :',value);
    if (value <= 1/3.0)
        observer.next(value);
    else if (value <= 2/3.0)
        observer.error("Value <= 2/3 (error)");
    else
        throw "Value > 2/3 (throw)"
    observer.complete();
}
// Usage
observable.subscribe(nextFunc, errorFunc, completeFunc);
function nextFunc(value) {
    console.log("Got value: " + value);
}
function errorFunc(error) {
    console.log("Caught error: " + error);
}
function completeFunc() {
    console.log("Completed");
}
