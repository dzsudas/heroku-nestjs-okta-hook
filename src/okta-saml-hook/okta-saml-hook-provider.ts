import {applyDecorators, Inject, SetMetadata} from '@nestjs/common';

import {HookMetadata, SamlInlineHookPayload} from "src/okta-saml-hook/types";

export const HOOK_SERVICE = 'HOOK_SERVICE';

export const OktaSamlHookService = (name: string) =>
  applyDecorators(
    Inject(),
    SetMetadata<string, HookMetadata>(HOOK_SERVICE, {name: name})
  );

export interface OktaSamlHookProvider {
  getData(payload: SamlInlineHookPayload): Promise<Record<string, string | boolean | number>>
}