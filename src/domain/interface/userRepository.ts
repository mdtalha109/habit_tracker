export interface UserRepository {
  createUser(username: string, email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;

}