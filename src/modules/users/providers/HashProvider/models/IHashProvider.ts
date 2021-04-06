export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payment: string, hashed: string): Promise<boolean>;
}
