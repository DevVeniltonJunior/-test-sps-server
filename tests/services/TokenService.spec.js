import { expect, it, jest } from '@jest/globals';
import { TokenService } from "../../src/services";

describe("[Service] TokenService", () => {
  const tokenService = new TokenService()
  const userPayload = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    role: "user"
  };

  const token = tokenService.generateToken(userPayload);

  it("should generate and verify a token correctly", () => {
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.split('.')).toHaveLength(3);
  });

  it("should verify a valid token", () => {
    const decoded = tokenService.verifyToken(token);
    expect(decoded).toMatchObject(userPayload);
  });

  it("should throw an error for an invalid token", () => {
    const invalidToken = token + "corrupted";
    expect(() => {
      tokenService.verifyToken(invalidToken);
    }).toThrow('Invalid token');
  });

  it("should throw an error for an expired token", async () => {
    const shortLivedTokenService = new TokenService({ tokenExpiry: 0.001 }); // 3.6 seconds
    const shortLivedToken = shortLivedTokenService.generateToken(userPayload);

    // Wait for token to expire
    await new Promise(resolve => setTimeout(resolve, 4000));

    expect(() => {
      shortLivedTokenService.verifyToken(shortLivedToken);
    }).toThrow('Token expired');
  });
});