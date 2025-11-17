import { Injectable } from '@nestjs/common';
import {DiscoveryService} from "@nestjs/core";
import {InstanceWrapper} from "@nestjs/core/injector/instance-wrapper";
import {HOOK_SERVICE, OktaSamlHookProvider} from "src/okta-saml-hook/okta-saml-hook-provider";
import {HookMetadata, SamlInlineHookPayload} from "src/okta-saml-hook/types";

const withMetadataKey = (metadataKey: string) => (wrapper: InstanceWrapper) =>
  wrapper.metatype && Reflect.getMetadata(metadataKey, wrapper.metatype)


@Injectable()
export class HookServiceProviderService {
  constructor(
    private readonly discoveryService: DiscoveryService,
  ) {
  }

  getOktaSamlHookProvider(payload: SamlInlineHookPayload) {
    const hookProviders: InstanceWrapper<OktaSamlHookProvider>[] = this.discoveryService.getProviders()
      .filter(withMetadataKey(HOOK_SERVICE));

    return hookProviders.find(({metatype}) => {
      const metadata: HookMetadata = Reflect.getMetadata(HOOK_SERVICE, metatype)

      return payload.source.includes(metadata.name);
    })?.instance
  }
}
