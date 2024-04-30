import { UserM } from '../model/user';

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserM>;
  insert(todo: UserM): Promise<UserM>;
  deleteById(id: number): Promise<void>;
  findAll(): Promise<UserM[]>;
  findById(id: number): Promise<UserM>;
  updateContent(id: number, username: string, active: boolean): Promise<void>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
