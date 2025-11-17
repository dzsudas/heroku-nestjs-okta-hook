import { Module } from '@nestjs/common';
import { OktaSamlHookController } from './okta-saml-hook.controller';
import { HookServiceProviderService } from './hook-service-provider.service';
import {DiscoveryModule} from "@nestjs/core";

@Module({
  imports: [DiscoveryModule],
  controllers: [OktaSamlHookController],
  providers: [HookServiceProviderService]
})
export class OktaSamlHookModule {}
