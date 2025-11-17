import { Module } from '@nestjs/common';
import {DiscoveryModule} from "@nestjs/core";
import { OktaSamlHookModule } from './okta-saml-hook/okta-saml-hook.module';
import { SamlTestHookModule } from './saml-test-hook/saml-test-hook.module';

@Module({
  imports: [DiscoveryModule, OktaSamlHookModule, SamlTestHookModule],
})
export class AppModule {}
