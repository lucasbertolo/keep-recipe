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
