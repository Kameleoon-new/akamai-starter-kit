import { IExternalEventSource } from "@kameleoon/nodejs-sdk";

// -- Custom Implementation of Kameleoon Event Source
export class AkamaiEventSource implements IExternalEventSource {
  // - Akamai EdgeWorkers do not support Server Sent Events (SSE)
  //   If you see this error - make sure that your project (siteCode) doesn't have Real Time Updates
  //   option enabled on the Kameleoon Platform
  public open() {
    throw new Error(
      "Real Time Updates are not supported in Akamai EdgeWorkers"
    );
  }

  public close() {}
}
