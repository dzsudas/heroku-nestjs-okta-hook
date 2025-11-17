import {OktaSamlHookProvider, OktaSamlHookService} from "src/okta-saml-hook/okta-saml-hook-provider";
import {SamlProvider} from "src/constants";
import {SamlInlineHookPayload} from "src/okta-saml-hook/types";

@OktaSamlHookService(SamlProvider.SAML_INLINE_HOOK_TEST_APP)
export class SamlTestHookService implements OktaSamlHookProvider {

  async getData(payload: SamlInlineHookPayload) {
    return {
      "attributes": "Blah",
      "isVip": true,
      "UserId": payload.userName
    }
  }
}
