import {ReadableStream } from "k6/experimental/streams";

// Note @oleiade: ReadableStreamDefaultReader's and ReadableStreamDefaultController's method
// either take no arguments or take optional arguments only and thus do not need to be tested. 

//
// ReadableStream
//
const readableStream: ReadableStream = new ReadableStream();

// @ts-expect-error
new ReadableStream(1);
// @ts-expect-error
new ReadableStream({}, 1);

// @ts-expect-error
await readableStream.cancel();

// @ts-expect-error
readableStream.getReader({ mode: 1 });
