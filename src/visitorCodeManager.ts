import { Cookies, SetCookie } from "cookies";
import {
  GetDataCustomParametersType,
  IExternalCustomVisitorCodeManager,
  SetDataCustomParametersType,
} from "@kameleoon/nodejs-sdk";

// -- Custom implementation of Kameleoon VisitorCodeManager
//    in order to be able to get visitor code from cookies

export class AkamaiVisitorCodeManager
  implements IExternalCustomVisitorCodeManager
{
  public getData(
    params: GetDataCustomParametersType & { input: EW.IngressClientRequest }
  ): string | null {
    const { key, input } = params;
    const visitorCode = new Cookies(input.getHeader("Cookie"))?.get(key);

    if (!visitorCode) {
      return null;
    }

    return visitorCode;
  }

  public setData(
    params: SetDataCustomParametersType & { output: EW.EgressClientResponse }
  ): void {
    const { key, visitorCode, domain, maxAge, path, output } = params;

    if (!output) {
      return;
    }

    const cookie = new SetCookie({
      name: key,
      value: visitorCode,
      domain,
      maxAge,
      path,
    });

    output.setHeader("Set-Cookie", cookie.toHeader());
  }
}
