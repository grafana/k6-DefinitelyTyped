import * as fs from "node:fs";
import * as stream from "node:stream";
import {
    connect,
    ConnectionOptions,
    createSecureContext,
    createServer,
    DEFAULT_CIPHERS,
    DEFAULT_ECDH_CURVE,
    DEFAULT_MAX_VERSION,
    DEFAULT_MIN_VERSION,
    EphemeralKeyInfo,
    getCiphers,
    PeerCertificate,
    rootCertificates,
    SecureContext,
    Server,
    TlsOptions,
    TLSSocket,
} from "node:tls";

{
    const ctx: SecureContext = createSecureContext({
        key: "NOT REALLY A KEY",
        cert: "SOME CERTIFICATE",
    });
    const blah = ctx.context;

    const connOpts: ConnectionOptions = {
        host: "127.0.0.1",
        port: 55,
        pskCallback(hint) {
            if (hint === "something??") {
                return null;
            }
            return {
                identity: "henlo",
                psk: Buffer.from("asd"),
            };
        },
    };
    const tlsSocket = connect(connOpts);

    const cert: PeerCertificate | object | null = tlsSocket.getCertificate();
    const keyInfo: EphemeralKeyInfo | object | null = tlsSocket.getEphemeralKeyInfo();
    const finishedMsg: Buffer | undefined = tlsSocket.getFinished();
    const peerFinishedMsg: Buffer | undefined = tlsSocket.getPeerFinished();
    const sharedAlgs: string[] = tlsSocket.getSharedSigalgs();
    const isSessionReused: boolean = tlsSocket.isSessionReused();

    if (keyInfo && "type" in keyInfo) {
        const keyType: string = keyInfo.type;
        const keyName: string | undefined = keyInfo.name;
        const keySize: number = keyInfo.size;
    }

    tlsSocket.disableRenegotiation();
    tlsSocket.enableTrace();

    tlsSocket.encrypted; // $ExpectType true

    const ciphers: string[] = getCiphers();
    const curve: string = DEFAULT_ECDH_CURVE;
    const maxVersion: string = DEFAULT_MAX_VERSION;
    const minVersion: string = DEFAULT_MIN_VERSION;
    const cyphers: string = DEFAULT_CIPHERS;

    const buf: Buffer = tlsSocket.exportKeyingMaterial(123, "test", Buffer.from("nope"));

    tlsSocket.getPeerX509Certificate(); // $ExpectType X509Certificate | undefined
    tlsSocket.getX509Certificate(); // $ExpectType X509Certificate | undefined

    tlsSocket.setKeyCert({
        cert: fs.readFileSync("cert_filepath"),
        key: fs.readFileSync("key_filepath"),
    });
    tlsSocket.setKeyCert(createSecureContext({
        key: "NOT REALLY A KEY",
        cert: "SOME CERTIFICATE",
    }));
}

{
    const _server = createServer({
        enableTrace: true,
        pskCallback(socket, ident) {
            if (ident === "something") {
                return null;
            }
            return Buffer.from("asdasd");
        },
    });

    _server.addContext("example", {
        cert: fs.readFileSync("cert_filepath"),
        key: fs.readFileSync("key_filepath"),
    });

    _server.addContext(
        "example",
        createSecureContext({
            key: "NOT REALLY A KEY",
            cert: "SOME CERTIFICATE",
        }),
    );
}

{
    const _server = createServer({}, (socket) => {
        const _keys: Buffer = _server.getTicketKeys();
        _server.setTicketKeys(_keys);
    });
}

{
    const _server = createServer({});
    _server.setSecureContext({
        key: "NOT REALLY A KEY",
        cert: "SOME CERTIFICATE",
    });
}

{
    let _server = createServer({});
    let _boolean: boolean;
    const _func1 = () => {};
    const _func2 = (err: Error | null, sessionData: Buffer | null) => {};
    /**
     * events.EventEmitter
     * 1. tlsClientError
     * 2. newSession
     * 3. OCSPRequest
     * 4. resumeSession
     * 5. secureConnection
     */

    _server = _server.addListener("tlsClientError", (err, tlsSocket) => {
        const _err: Error = err;
        const _tlsSocket: TLSSocket = tlsSocket;
    });
    _server = _server.addListener("newSession", (sessionId, sessionData, callback) => {
        const _sessionId: Buffer = sessionId;
        const _sessionData: Buffer = sessionData;
        const _func1 = callback;
    });
    _server = _server.addListener("OCSPRequest", (certificate, issuer, callback) => {
        const _certificate: Buffer = certificate;
        const _issuer: Buffer = issuer;
        const _callback: Function = callback;
    });
    _server = _server.addListener("resumeSession", (sessionId, callback) => {
        const _sessionId: Buffer = sessionId;
        const _func2 = callback;
    });
    _server = _server.addListener("secureConnection", (tlsSocket) => {
        const _tlsSocket: TLSSocket = tlsSocket;
    });

    const _err: Error = new Error();
    const _tlsSocket: TLSSocket = connect(1);
    const _any: Buffer = Buffer.from("asd");
    const _func: Function = () => {};
    const _buffer: Buffer = Buffer.from("a");
    _boolean = _server.emit("tlsClientError", _err, _tlsSocket);
    _boolean = _server.emit("newSession", _any, _any, _func1);
    _boolean = _server.emit("OCSPRequest", _buffer, _buffer, _func);
    _boolean = _server.emit("resumeSession", _any, _func2);
    _boolean = _server.emit("secureConnection", _tlsSocket);

    _server = _server.on("tlsClientError", (err, tlsSocket) => {
        const _err: Error = err;
        const _tlsSocket: TLSSocket = tlsSocket;
    });
    _server = _server.on("newSession", (sessionId, sessionData, callback) => {
        const _sessionId: Buffer = sessionId;
        const _sessionData: Buffer = sessionData;
        const _func1 = callback;
    });
    _server = _server.on("OCSPRequest", (certificate, issuer, callback) => {
        const _certificate: Buffer = certificate;
        const _issuer: Buffer = issuer;
        const _callback: Function = callback;
    });
    _server = _server.on("resumeSession", (sessionId, callback) => {
        const _sessionId: Buffer = sessionId;
        const _func2 = callback;
    });
    _server = _server.on("secureConnection", (tlsSocket) => {
        const _tlsSocket: TLSSocket = tlsSocket;
    });

    _server = _server.on("keylog", (ln, sock) => {
        const line: Buffer = ln;
        const socket: TLSSocket = sock;
    });

    _server = _server.once("tlsClientError", (err, tlsSocket) => {
        const _err: Error = err;
        const _tlsSocket: TLSSocket = tlsSocket;
    });
    _server = _server.once("newSession", (sessionId, sessionData, callback) => {
        const _sessionId: Buffer = sessionId;
        const _sessionData: Buffer = sessionData;
        const _func1 = callback;
    });
    _server = _server.once("OCSPRequest", (certificate, issuer, callback) => {
        const _certificate: Buffer = certificate;
        const _issuer: Buffer = issuer;
        const _callback: Function = callback;
    });
    _server = _server.once("resumeSession", (sessionId, callback) => {
        const _sessionId: Buffer = sessionId;
        const _func2 = callback;
    });
    _server = _server.once("secureConnection", (tlsSocket) => {
        const _tlsSocket: TLSSocket = tlsSocket;
    });

    _server = _server.prependListener("tlsClientError", (err, tlsSocket) => {
        const _err: Error = err;
        const _tlsSocket: TLSSocket = tlsSocket;
    });
    _server = _server.prependListener("newSession", (sessionId, sessionData, callback) => {
        const _sessionId: Buffer = sessionId;
        const _sessionData: Buffer = sessionData;
        const _func1 = callback;
    });
    _server = _server.prependListener("OCSPRequest", (certificate, issuer, callback) => {
        const _certificate: Buffer = certificate;
        const _issuer: Buffer = issuer;
        const _callback: Function = callback;
    });
    _server = _server.prependListener("resumeSession", (sessionId, callback) => {
        const _sessionId: Buffer = sessionId;
        const _func2 = callback;
    });
    _server = _server.prependListener("secureConnection", (tlsSocket) => {
        const _tlsSocket: TLSSocket = tlsSocket;
    });

    _server = _server.prependOnceListener("tlsClientError", (err, tlsSocket) => {
        const _err: Error = err;
        const _tlsSocket: TLSSocket = tlsSocket;
    });
    _server = _server.prependOnceListener("newSession", (sessionId, sessionData, callback) => {
        const _sessionId: Buffer = sessionId;
        const _sessionData: Buffer = sessionData;
        const _func1 = callback;
    });
    _server = _server.prependOnceListener("OCSPRequest", (certificate, issuer, callback) => {
        const _certificate: Buffer = certificate;
        const _issuer: Buffer = issuer;
        const _callback: Function = callback;
    });
    _server = _server.prependOnceListener("resumeSession", (sessionId, callback) => {
        const _sessionId: Buffer = sessionId;
        const _func2 = callback;
    });
    _server = _server.prependOnceListener("secureConnection", (tlsSocket) => {
        const _tlsSocket: TLSSocket = tlsSocket;
    });

    // close callback parameter is optional
    _server = _server.close();

    // close callback parameter doesn't specify any arguments, so any
    // function is acceptable
    _server = _server.close(() => {});
    _server = _server.close((...args: any[]) => {});
}

{
    let socket = connect({});
    let _boolean: boolean;
    /**
     * events.EventEmitter
     * 1. close
     * 2. error
     * 3. listening
     * 4. message
     */

    socket = socket.addListener("OCSPResponse", (response) => {
        const _response: Buffer = response;
    });
    socket = socket.addListener("secureConnect", () => {});

    const _buffer: Buffer = Buffer.from("");
    _boolean = socket.emit("OCSPResponse", _buffer);
    _boolean = socket.emit("secureConnect");

    socket = socket.on("OCSPResponse", (response) => {
        const _response: Buffer = response;
    });
    socket = socket.on("secureConnect", () => {});

    socket = socket.once("OCSPResponse", (response) => {
        const _response: Buffer = response;
    });
    socket = socket.once("secureConnect", () => {});

    socket = socket.prependListener("OCSPResponse", (response) => {
        const _response: Buffer = response;
    });
    socket = socket.prependListener("secureConnect", () => {});

    socket = socket.prependOnceListener("OCSPResponse", (response) => {
        const _response: Buffer = response;
    });
    socket = socket.prependOnceListener("secureConnect", () => {});

    socket.once("session", (buff: Buffer) => {});
}

{
    const duplex = new stream.PassThrough();
    const connOpts: ConnectionOptions = {
        socket: duplex,
    };
    const tlsSocket = connect(connOpts);
}

{
    const r00ts: readonly string[] = rootCertificates;
}

{
    const _options: TlsOptions = {};
    const _server = new Server(_options, (socket) => {});
}

{
    const ctx: SecureContext = createSecureContext({
        key: "NOT REALLY A KEY",
        cert: "SOME CERTIFICATE",
    });
    const _options: TlsOptions = {
        SNICallback: (servername: string, cb: (err: Error | null, ctx?: SecureContext) => void): void => {
            cb(new Error("Not found"));
            cb(new Error("Not found"), undefined);
            cb(null, undefined);
            cb(null, ctx);
        },
    };
}
