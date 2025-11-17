import {OktaSamlHookProvider, OktaSamlHookService} from "src/okta-saml-hook/okta-saml-hook-provider";
import {SamlInlineHookPayload} from "src/okta-saml-hook/types";

@OktaSamlHookService("samlinlinehooktest")
export class SamlTestHookService implements OktaSamlHookProvider {

  async getData(payload: SamlInlineHookPayload) {
    return {
      "attributes": "Blah",
      "isVip": true,
      "UserId": payload.userName
    }
  }
}
