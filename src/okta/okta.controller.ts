import {Body, Controller, Get, Post} from '@nestjs/common';

@Controller('okta')
export class OktaController {

  @Post('sso/saml/hook')
  handleSamlHook(@Body() payload: any) {
    console.log('Received Inline Hook payload:', payload);

    return {
      result: 'ok',
    };
  }

  @Get('sso/saml/hook')
  handleSamlHookGet(@Body() payload: any) {
    console.log('Received Inline Hook payload:', payload);

    return {
      result: 'ok',
    };
  }
}
