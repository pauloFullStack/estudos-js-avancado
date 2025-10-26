function memoize(fn) {
    const cache = new Map();
    let callCount = 0;

    const memoizedFn = function(...args) {
        const key = JSON.stringify(args); // chave única baseada nos argumentos

        if (cache.has(key)) {
            return cache.get(key);
        }

        callCount++;
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };

    memoizedFn.getCallCount = function() {
        return callCount;
    };

    return memoizedFn;
}


// Funções fornecidas no enunciado:
const sum = (a, b) => a + b;
const fib = (n) => (n <= 1 ? 1 : fib(n - 1) + fib(n - 2));
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));


// Função principal para executar entradas:
function run(fnName, actions, values) {
    let fn;

    if (fnName === "sum") fn = sum;
    if (fnName === "fib") fn = fib;
    if (fnName === "factorial") fn = factorial;

    const memoized = memoize(fn);
    const output = [];

    for (let i = 0; i < actions.length; i++) {
        if (actions[i] === "call") {
            output.push(memoized(...values[i]));
        } else { // getCallCount
            output.push(memoized.getCallCount());
        }
    }

    return output;
}


// -------- EXEMPLOS --------

// Example 1
console.log(run(
  "sum",
  ["call","call","getCallCount","call","getCallCount"],
  [[2,2],[2,2],[],[1,2],[]]
)); // [4,4,1,3,2]

// Example 2
console.log(run(
  "factorial",
  ["call","call","call","getCallCount","call","getCallCount"],
  [[2],[3],[2],[],[3],[]]
)); // [2,6,2,2,6,2]

// Example 3
console.log(run(
  "fib",
  ["call","getCallCount"],
  [[5],[]]
)); // [8,1]
