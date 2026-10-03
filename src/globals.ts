import { TextEncoder, btoa } from "encoding";

// The SDK encodes credentials with global TextEncoder/btoa when Buffer is unavailable.
// EdgeWorkers expose them only through the "encoding" module, so register them globally.
const g = globalThis as Record<string, unknown>;
g.TextEncoder ??= TextEncoder;
g.btoa ??= btoa;
