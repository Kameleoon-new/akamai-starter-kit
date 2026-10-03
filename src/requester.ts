import {
  KameleoonUtils,
  IExternalRequester,
  SendRequestParametersType,
  RequestType,
  KameleoonResponseType,
} from "@kameleoon/nodejs-sdk";
import { NAMESPACE, GROUP, SITE_CODE } from "./constants";
import { EdgeKV } from "./lib/edgekv.js";

export class AkamaiWorkerRequester implements IExternalRequester {
  public async sendRequest({
    requestType,
    url,
  }: SendRequestParametersType<RequestType>): Promise<KameleoonResponseType> {
    if (requestType === RequestType.Configuration) {
      const ek = new EdgeKV(NAMESPACE, GROUP);
      const config = await ek.getText({ item: getConfigItemKey(url) });

      if (config) {
        return KameleoonUtils.simulateSuccessRequest(
          requestType,
          JSON.parse(config)
        );
      } else {
        throw new Error("Edgekv failure");
      }
    }

    return await KameleoonUtils.simulateSuccessRequest(requestType, null);
  }
}

// Kameleoon stores the configuration under `${SITE_CODE}_V${n}`, where `n` is the
// configuration format version. The SDK requests `https://sdk-config.kameleoon.eu/v{n}/...`,
// so deriving the version from the first path segment guarantees the item matches
// the format the SDK expects.
function getConfigItemKey(url: string): string {
  const version = url.match(/^https?:\/\/[^/]+\/v(\d+)\//)?.[1];

  if (!version) {
    throw new Error(`Unable to detect configuration version from URL: ${url}`);
  }

  return `${SITE_CODE}_V${version}`;
}
