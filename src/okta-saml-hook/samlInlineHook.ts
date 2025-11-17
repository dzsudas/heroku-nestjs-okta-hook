import {SamlInlineHookPayload} from "src/okta-saml-hook/types";

type Payload = {
    eventId: string,
    eventTime: string,
    eventType: string,
    eventTypeVersion: string,
    contentType: string,
    cloudEventVersion: string,
    source: string,
    data: {
      context: {
        request: { id: string, method: string, url: { value: string }, ipAddress: string },
        protocol: { type: string, issuer: { id: string, name: string, uri: string } },
        session: {
          id: string,
          userId: string,
          login: string,
          createdAt: string,
          expiresAt: string,
          status: string,
          lastPasswordVerification: string,
          lastFactorVerification: string,
          amr: {},
          idp: { id: string, type: string },
          mfaActive: boolean
        },
        user: {
          id: string,
          passwordChanged: string,
          profile: { login: string, firstName: string, lastName: string, locale: string, timeZone: string },
        }
      },
      assertion: {
        subject: { nameId: string, nameFormat: string, confirmation: { method: string } },
        authentication: { sessionIndex: string, authnContext: { authnContextClassRef: string } },
        conditions: { audienceRestriction: {} },
        lifetime: { expiration: number }
      }
    }
  }

export const samlInlineHook = (payload: Payload): SamlInlineHookPayload => {
  try {
    console.log(JSON.stringify(payload.data.context.user.profile.login))
    return {
      issuerName: payload.data.context.protocol.issuer.name,
      userName: payload.data.context.user.profile.login,
      appId: payload.data.context.protocol.issuer.id
    }
  } catch (e) {
    throw new Error(`Problem when parsing SamlInlineHook payload, ${e}`);
  }
}