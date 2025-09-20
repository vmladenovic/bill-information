import '@testing-library/jest-dom';
import {ReadableStream} from 'node:stream/web';
import {TextDecoder, TextEncoder} from 'node:util';
import {clearImmediate} from 'node:timers';
import {performance} from 'node:perf_hooks';

afterAll(() => {
    jest.restoreAllMocks();
});

afterEach(() => {
    jest.clearAllTimers();
});

Object.defineProperties(globalThis, {
    ReadableStream: {value: ReadableStream},
    TextDecoder: {value: TextDecoder},
    TextEncoder: {value: TextEncoder},
    clearImmediate: {value: clearImmediate, writable: true},
    performance: {value: performance, writable: true},
    Blob: {value: Blob},
    File: {value: File},
});

// After pollyfills are added, we can load undici
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {fetch, Headers, FormData, Request, Response} = require('undici');

Object.defineProperties(globalThis, {
    Blob: {value: Blob},
    File: {value: File},
    FormData: {value: FormData},
    Headers: {value: Headers},
    Request: {value: Request},
    Response: {value: Response},
    fetch: {value: fetch, writable: true},
});
