import { Module } from '@nestjs/common';
import { SamlTestHookService } from './saml-test-hook.service';

@Module({
  providers: [SamlTestHookService],
})
export class SamlTestHookModule {}
