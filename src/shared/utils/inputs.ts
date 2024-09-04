export const containSpecialCharacter = (value?: string): boolean =>
  !!value && /[@%#&*=()><!?^]/.test(value);

export const containNumber = (value?: string): boolean =>
  !!value && /\d/.test(value);

export const containUppercase = (value?: string): boolean =>
  !!value && /[A-Z]/.test(value);

export const containLowercase = (value?: string): boolean =>
  !!value && /[a-z]/.test(value);

export const containWhitespace = (value?: string): boolean =>
  !!value && !/\s/.test(value);

export const noSpecialCharacters = (value?: string): boolean =>
  !!value && /^[a-zA-Z0-9]{1,15}$/.test(value);
