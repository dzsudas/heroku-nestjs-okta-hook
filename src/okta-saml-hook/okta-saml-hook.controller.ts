import {Body, Controller, Get, HttpCode, Logger, Post} from '@nestjs/common';
import {samlInlineHook} from "src/okta-saml-hook/samlInlineHook";
import * as mockData from "src/payload.json";
import {HookServiceProviderService} from "src/okta-saml-hook/hook-service-provider.service";

const HOOK_ERROR_MESSAGE = 'Sorry for the inconvenience we are unable to process your request.';

@Controller('okta')
export class OktaSamlHookController {
  private readonly logger = new Logger(OktaSamlHookController.name);

  constructor(private readonly provider: HookServiceProviderService) {
  }

  @Post('sso/saml/hook')
  @HttpCode(200)
  async handleSamlHook(@Body() payload: any) {
    try {
      const inlineHookPayload = samlInlineHook(payload)

      const provider = this.provider.getOktaSamlHookProvider(inlineHookPayload);

      if (!provider) {
        throw new Error("No Provider found for given payload")
      }

      const hookAttributes = await provider.getData(inlineHookPayload)

      return {
        "commands": Object.entries(hookAttributes).map(([key, value]) => {
          if (key === 'nameId') {
            return {
              "type": "com.okta.assertion.patch",
              "value": [
                {
                  "op": "replace",
                  "path": "/subject/nameId",
                  "value": `${value}`
                },
                {
                  "op": "replace",
                  "path": "/subject/format",
                  "value": "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent"
                }
              ]
            }
          }

          return {
            "type": "com.okta.assertion.patch",
            "value": [
              {
                "op": "add",
                "path": `/claims/${key}`,
                "value": {
                  "attributes": {
                    "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                  },
                  "attributeValues": [
                    {
                      "attributes": {
                        "xsi:type": "xs:string"
                      },
                      "value": `${value}`,
                    }
                  ]
                }
              }
            ]
          }
        })
      }
    } catch (e) {
      this.logger.error(`Error when processing okta hook endpoint: ${e.message}`);
      return {
        error: {
          errorSummary: HOOK_ERROR_MESSAGE,
          errorCauses: [
            {
              errorSummary: HOOK_ERROR_MESSAGE,
              reason: 'Error when generating okta hook response',
              locationType: 'body',
              location: 'data.context.request',
              domain: 'external-service',
            },
          ],
        },
      }
    }
  }

  @Get('sso/saml/hook')
  @HttpCode(200)
  handleSamlHookGet(@Body() payload: any) {
    return this.handleSamlHook(mockData)
  }
}
