/*
 * Custom entities exposed in the global environment.
 *
 * The global environment changes with execution context. Some items are
 * available only in the init context, others only during VU logic execution,
 * others in both contexts. Comments note availability.
 */

export {};

// Available without importing
declare global {
    // === Init context only ===
    // -------------------------

    /**
     * Opens a file, reading all its contents into memory.
     * https://grafana.com/docs/k6/latest/javascript-api/init-context/open/
     * @param filePath - Path to file.
     * @returns File contents decoded as UTF-8.
     * @example
     * let binFile = open('/path/to/file.bin', 'b');
     * export default function () {
     * var data = {
     *    field: 'this is a standard form field',
     *    file: http.file(binFile, 'test.bin'),
     *  };
     *  const res = http.post('https://example.com/upload', data);
     *  sleep(3);
     * }
     */
    function open(filePath: string): string;

    /**
     * Opens a file, reading all its contents into memory.
     * https://grafana.com/docs/k6/latest/javascript-api/init-context/open/
     * @param filePath - Path to file.
     * @returns Binary file contents.
     * @example
     * let binFile = open('/path/to/file.bin', 'b');
     * export default function () {
     * var data = {
     *    field: 'this is a standard form field',
     *    file: http.file(binFile, 'test.bin'),
     *  };
     *  const res = http.post('https://example.com/upload', data);
     *  sleep(3);
     * }
     */
    function open(filePath: string, mode: "b"): ArrayBuffer;

    // === Init context and VU logic ===
    // ---------------------------------

    /**
     * Environment variables.
     * https://grafana.com/docs/k6/latest/using-k6/environment-variables/
     */
    var __ENV: { [name: string]: string };

    // === VU logic only ===
    // ---------------------

    /**
     * Current VU number.
     * https://grafana.com/docs/k6/latest/using-k6/execution-context-variables/
     */
    var __VU: number;

    /**
     * Current iteration number.
     * https://grafana.com/docs/k6/latest/using-k6/execution-context-variables/
     */
    var __ITER: number;

    interface ImportMeta {
        /**
         * Resolve a path to a URL string in the same way an import statement does.
         * https://grafana.com/docs/k6/latest/javascript-api/import.meta/resolve/
         */
        resolve(specifier: string): string;
    }

    // === Console ===
    // ---------------

    /**
     * k6 console for logging messages during test execution.
     * https://grafana.com/docs/k6/latest/javascript-api/console/
     */
    interface Console {
        /**
         * Logs a message to the console.
         *
         * Supports Deno-style formatted output for ArrayBuffer and TypedArray objects.
         * TypedArray values display as `TypeName(length) [ elements ]`.
         * ArrayBuffer values display as `ArrayBuffer { [Uint8Contents]: <hex>, byteLength: N }`.
         *
         * @example
         * ```js
         * // Log basic values
         * console.log('Hello, k6!');
         * console.log({ status: 200, body: 'OK' });
         *
         * // Log TypedArray - displays type, length, and elements
         * console.log(new Uint8Array([1, 2, 3]));
         * // Output: Uint8Array(3) [ 1, 2, 3 ]
         *
         * // Log ArrayBuffer - displays hex contents and byte length
         * console.log(new ArrayBuffer(4));
         * // Output: ArrayBuffer { [Uint8Contents]: <00 00 00 00>, byteLength: 4 }
         * ```
         *
         * @param args Values to log.
         */
        log(...args: unknown[]): void;
    }

    /**
     * k6 console object for logging messages during test execution.
     * https://grafana.com/docs/k6/latest/javascript-api/console/
     */
    var console: Console;
}
