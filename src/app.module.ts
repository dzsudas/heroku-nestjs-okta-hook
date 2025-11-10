import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OktaController } from './okta/okta.controller';

@Module({
  imports: [],
  controllers: [AppController, OktaController],
  providers: [AppService],
})
export class AppModule {}
