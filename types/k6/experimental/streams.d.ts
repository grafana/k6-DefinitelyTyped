/**
 * The k6 experimental streams module provides an implementation of the Streams API allowing you to work with streams of data
 * in your k6 tests. It enables you to define and consume readable streams of data.
 */

export class ReadableStream {
    /**
     * 
     * @param underlyingSource 
     * @param strategy 
     */
    constructor(underlyingSource?: UnderlyingSource, strategy?: QueuingStrategy);

    /**
     * Returns a boolean indicating whether the stream is locked to a reader.
     */
    get locked(): boolean;

    /**
     * cancel is used when you've completely finished with the stream and don't need any more data from it, even if there are chunks enqueued waiting to be read.
     * 
     * @param reason A human-readable reason for the cancellation. This is passed to the underlying source, which may or may not use it.
     * @throws TypeError The stream you are trying to cancel is not a ReadableStream, or it is locked.
     * @returns A promise that resolves when the stream has been successfully cancelled.
     */
    cancel(reason?: any): Promise<undefined>;

    /**
     * Creates a reader and locks the stream to it.
     * 
     * @param options An object specifying the type of reader to create. Currently only `undefined` is supported.
     * @throws TypeError Thrown if the stream you are trying to create a reader for is already locked, or not a ReadableStream.
     * @returns A ReadableStreamDefaultReader instance.
     */
    getReader(options?: { mode?: undefined}): ReadableStreamDefaultReader;
}

export interface UnderlyingSource {
    /**
     * start is called immediately after the ReadableStream is constructed, and should perform any initialisation necessary to begin generating chunks of data.
     * 
     * @param controller A ReadableStreamDefaultController instance provided by the runtime.
     */
    start(controller: ReadableStreamDefaultController): void;

    /**
     * pull is called when the stream's internal queue is ready for more data to be added to it.
     * 
     * @param controller A ReadableStreamDefaultController instance provided by the runtime.
     */
    pull(controller: ReadableStreamDefaultController): void;

    /**
     * cancel is called when the stream is cancelled. It should clean up any resources that are no longer needed.
     * 
     * @param reason A human-readable reason for the cancellation. This is passed to the underlying source, which may or may not use it.
     */
    cancel(reason: any): void;
}

/**
 * 
 */
export interface QueuingStrategy {
    /**
     * highWaterMark is a number representing the total number of chunks that the stream can contain at any one time.
     */
    highWaterMark: number;

    /**
     * size is a function that returns the size of a chunk of data. It is called with a single argument, chunk, which is the chunk of data to be sized.
     */
    size?: undefined;
}

export class CountQueuingStrategy implements QueuingStrategy {
    /**
     * highWaterMark is a number representing the total number of chunks that the stream can contain at any one time.
     */
    highWaterMark: number;

    /**
     * Constructs a new CountQueuingStrategy instance.
     * 
     * @param options An object specifying the highWaterMark property.
     */
    constructor(options: { highWaterMark: number });
}

export class ReadableStreamDefaultReader {
    /**
     * Returns a promise that fulfills when the stream closes, or rejects if the stream throws an error or the reader's lock is released. This property enables you to write code that responds to an end to the streaming process.
     */
    get closed(): Promise<undefined>;

    /**
     * cancel is used when you've completely finished with the stream and don't need any more data from it, even if there are chunks enqueued waiting to be read.
     * 
     * @param reason A human-readable reason for the cancellation. This is passed to the underlying source, which may or may not use it.
     * @throws TypeError The source object is not a ReadableStreamDefaultReader, or the stream has no owner.
     * @returns A promise that resolves when the stream has been successfully cancelled.
     */
    cancel(reason?: any): Promise<undefined>;

    /**
     * read is used to read the next chunk of data from the stream.
     * 
     * @throws TypeError The source object is not a ReadableStreamDefaultReader, or the stream has no owner.
     * @returns A promise that resolves with an object containing two properties: done and value. done is a boolean that indicates whether the stream has been fully read, and value is the chunk of data that was read.
     */
    read(): Promise<{done: boolean, value: any}>;

    /**
     * releaseLock is used to release the lock on the stream, allowing other readers to access it.
     * 
     * @throws TypeError The source object is not a ReadableStreamDefaultReader, or the stream has no owner.
     * @returns undefined
     */
    releaseLock(): undefined;
}

export class ReadableStreamDefaultController {
    /**
     * desiredSize returns a number representing the number of chunks of data that the stream's internal queue can accept.
     */
    get desiredSize(): number;

    /**
     * close is used to close the stream, indicating that no more data will be added to it.
     * 
     * @throws TypeError if the source object is not a ReadableStreamDefaultController
     * @returns undefined
     */
    close(): undefined;

    /**
     * enqueue is used to add a chunk of data to the stream's internal queue.
     * 
     * @param chunk The chunk of data to add to the queue.
     * @throws TypeError if the source object is not a ReadableStreamDefaultController
     * @returns undefined
     */
    enqueue(chunk: any): undefined;

    /**
     * error is used to signal that an error occurred while processing the stream.
     * 
     * @param e The error that occurred.
     * @throws TypeError if the source object is not a ReadableStreamDefaultController
     * @returns undefined
     */
    error(e: any): undefined;
}