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
  }: SendRequestParametersType<RequestType>): Promise<KameleoonResponseType> {
    if (requestType === RequestType.Configuration) {
      const ek = new EdgeKV(NAMESPACE, GROUP);
      const config = await ek.getText({ item: SITE_CODE });

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
