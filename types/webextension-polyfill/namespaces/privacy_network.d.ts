//////////////////////////////////////////////////////
// BEWARE: DO NOT EDIT MANUALLY! Changes will be lost!
//////////////////////////////////////////////////////

import { Types } from "./types";

/**
 * Namespace: browser.privacy.network
 */
export namespace PrivacyNetwork {
    /**
     * The IP handling policy of WebRTC.
     */
    type IPHandlingPolicy =
        | "default"
        | "default_public_and_private_interfaces"
        | "default_public_interface_only"
        | "disable_non_proxied_udp"
        | "proxy_only";

    /**
     * An object which describes TLS minimum and maximum versions.
     */
    interface tlsVersionRestrictionConfig {
        /**
         * The minimum TLS version supported.
         * Optional.
         */
        minimum?: TlsVersionRestrictionConfigMinimumEnum;

        /**
         * The maximum TLS version supported.
         * Optional.
         */
        maximum?: TlsVersionRestrictionConfigMaximumEnum;
    }

    /**
     * The mode for https-only mode.
     */
    type HTTPSOnlyModeOption = "always" | "private_browsing" | "never";

    /**
     * The minimum TLS version supported.
     */
    type TlsVersionRestrictionConfigMinimumEnum = "TLSv1" | "TLSv1.1" | "TLSv1.2" | "TLSv1.3" | "unknown";

    /**
     * The maximum TLS version supported.
     */
    type TlsVersionRestrictionConfigMaximumEnum = "TLSv1" | "TLSv1.1" | "TLSv1.2" | "TLSv1.3" | "unknown";

    interface Static {
        /**
         * If enabled, the browser attempts to speed up your web browsing experience by pre-resolving DNS entries,
         * prerendering sites (<code>&lt;link rel='prefetch' ...&gt;</code>), and preemptively opening TCP and SSL connections to
         * servers.  This preference's value is a boolean, defaulting to <code>true</code>.
         */
        networkPredictionEnabled: Types.Setting;

        /**
         * Allow users to enable and disable RTCPeerConnections (aka WebRTC).
         */
        peerConnectionEnabled: Types.Setting;

        /**
         * Allow users to specify the media performance/privacy tradeoffs which impacts how WebRTC traffic will be routed and how
         * much local address information is exposed. This preference's value is of type IPHandlingPolicy, defaulting to <code>
         * default</code>.
         */
        webRTCIPHandlingPolicy: Types.Setting;

        /**
         * This property controls the minimum and maximum TLS versions. This setting's value is an object of
         * $(ref:tlsVersionRestrictionConfig).
         */
        tlsVersionRestriction: Types.Setting;

        /**
         * Allow users to query the mode for 'HTTPS-Only Mode'. This setting's value is of type HTTPSOnlyModeOption,
         * defaulting to <code>never</code>.
         */
        httpsOnlyMode: Types.Setting;

        /**
         * Allow users to query the status of 'Global Privacy Control'. This setting's value is of type boolean,
         * defaulting to <code>false</code>.
         */
        globalPrivacyControl: Types.Setting;
    }
}
