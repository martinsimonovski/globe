import Base64URL from 'base64-url';

export function toCursor({ value }) {
  return Base64URL.encode(value.toString());
}

export function fromCursor(string) {
  const value = Base64URL.decode(string);
  if (value) {
    return value;
  } else {
    return null;
  }
}
