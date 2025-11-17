export interface SamlInlineHookPayload {
  issuerName: string;
  userName: string
  appId: string
}

export interface HookMetadata {
  issuerName: string
}