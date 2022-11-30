//Function Fibonacci Clasica:
//function fibonacci(num) {
//    if (num <= 1) {
//     return 1;
//    }
//  
//   return fibonacci(num - 1) + fibonacci(num - 2);
//  }

//Function Fibonacci iterada:
function* fibonacciGenerator(): IterableIterator<number> {
    let a = 0;
    let b= 1;
    while(true){
        yield a;
        [a,b] = [b, a + b];
    }
}

let numbers = fibonacciGenerator();

console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());