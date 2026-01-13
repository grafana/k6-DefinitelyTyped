// open
open();
// @ts-expect-error
open(5);
const text: string = open("file.txt");
// @ts-expect-error
open(5, "b");
// @ts-expect-error
open("file.bin", 5);
open("file.bin", "notamode");
const arrayBuffer: ArrayBuffer = open("file.bin", "b");
// @ts-expect-error
open("file.bin", "b", 5);

// state
__VU; // $ExpectType number
__VU = 9;
__ITER; // $ExpectType number
__ITER = 9;

// environment
// @ts-expect-error
__ENV = 5;
__ENV; // $ExpectType { [name: string]: string; }

// import.meta.resolve
import.meta.resolve("test"); // $ExpectType string

// @ts-expect-error
import.meta.resolve();

// @ts-expect-error
import.meta.resolve("test", "something");

// console.log with various types
// $ExpectType void
console.log("Hello, k6!");
// $ExpectType void
console.log("Multiple", "arguments", 123, true);
// $ExpectType void
console.log({ name: "test", value: 42 });
// $ExpectType void
console.log([1, 2, 3, 4, 5]);

// console.log with ArrayBuffer and TypedArray
// $ExpectType void
console.log(new ArrayBuffer(8));
// $ExpectType void
console.log(new Uint8Array([1, 2, 3, 4]));
// $ExpectType void
console.log(new Int32Array([100, 200, 300]));
// $ExpectType void
console.log(new Float64Array([3.14, 2.71]));

// console.log with nested binary data
// $ExpectType void
console.log({ buffer: new ArrayBuffer(4) });
// $ExpectType void
console.log({ data: new Uint8Array([10, 20, 30]) });
