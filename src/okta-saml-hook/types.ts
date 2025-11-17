export interface SamlInlineHookPayload {
  issuerName: string;
  source: string;
  userName: string
  appId: string
}

export interface HookMetadata {
  name: string
}