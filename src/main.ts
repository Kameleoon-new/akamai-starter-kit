import { Compatibility, KameleoonClient } from "@kameleoon/nodejs-sdk";
import { SITE_CODE, CLIENT_ID, CLIENT_SECRET } from "./constants";
import { AkamaiWorkerRequester } from "./requester";
import { AkamaiVisitorCodeManager } from "./visitorCodeManager";
import { AkamaiEventSource } from "./eventSource";

// -- Cache the Kameleoon client between requests
let client: KameleoonClient;

export function onClientRequest(request: EW.IngressClientRequest) {
  request.respondWith(
    200,
    {},
    "<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>"
  );
}

export async function onClientResponse(
  request: EW.IngressClientRequest,
  response: EW.EgressClientResponse
) {
  try {
    if (!client) {
      client = new KameleoonClient({
        siteCode: SITE_CODE,
        credentials: {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
        },
        externals: {
          requester: new AkamaiWorkerRequester(),
          visitorCodeManager: new AkamaiVisitorCodeManager(),
          eventSource: new AkamaiEventSource(),
        },
        compatibility: Compatibility.Node14,
      });
    }

    if (!client.isInitialized()) {
      await client.initialize();
    }

    const visitorCode = client.getVisitorCode({
      input: request,
      output: response,
    });

    // -- Get the variation for the visitor under visitorCode in the found feature flag
    const variation = client.getVariation({
      visitorCode,
      featureKey: "YOUR_FEATURE_KEY",
      track: false,
    });

    // -- Get the value of the variable from the found feature flag
    const current_string_variable =
      variation.variables.get("YOUR_VARIABLE_NAME");

    response.setHeader("X-visitor-code", visitorCode);
    response.setHeader("X-custom-variable", String(current_string_variable));
  } catch (error) {
    response.setHeader("X-Client-Error", String(error));
  }
}
