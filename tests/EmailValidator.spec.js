import { it, jest } from '@jest/globals';
import { EmailValidator } from "../src/utils";

describe("[Utils] EmailValidator", () => {
  it("should validate a valid email address", () => {
    const isValid = EmailValidator.validate("test@example.com");
    expect(isValid).toBe(true);
  });

  it("should invalidate an invalid email address", () => {
    const isValid = EmailValidator.validate("invalid-email");
    expect(isValid).toBe(false);
  });
});