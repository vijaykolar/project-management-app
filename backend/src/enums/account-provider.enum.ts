export enum ProviderEnum {
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
  EMAIL = 'EMAIL',
}

export type ProviderEnumType = keyof typeof ProviderEnum;
