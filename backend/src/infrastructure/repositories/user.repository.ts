import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        username: username,
      },
      { hach_refresh_token: refreshToken },
    );
  }

  async getUserByUsername(username: string): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!adminUserEntity) {
      return null;
    }
    return this.toUser(adminUserEntity);
  }

  async updateLastLogin(username: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        username: username,
      },
      { last_login: () => 'CURRENT_TIMESTAMP' },
    );
  }
  
  async updateContent(id: number, username: string, active: boolean): Promise<void> {
    await this.userEntityRepository.update(
      {
        id: id,
      },
      { 
        username: username,
        active: active,
        last_login: () => 'CURRENT_TIMESTAMP' 
      },
    );
  }

  async findAll(): Promise<UserM[]> {
    const usersEntity = await this.userEntityRepository.find();
    return usersEntity.map((userEntity) => this.toUser(userEntity));
  }

  async findById(id: number): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOneOrFail(id);
    return this.toUser(userEntity);
  }

  async insert(user: UserM): Promise<UserM> {
    const todoEntity = this.toUserEntity(user);
    const result = await this.userEntityRepository.insert(todoEntity);
    return this.toUser(result.generatedMaps[0] as User);
  }

  async deleteById(id: number): Promise<void> {
    await this.userEntityRepository.delete({ id: id });
  }

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.username = adminUserEntity.username;
    adminUser.active = adminUserEntity.active;
    adminUser.password = adminUserEntity.password;
    adminUser.createDate = adminUserEntity.createdate;
    adminUser.updatedDate = adminUserEntity.updateddate;
    adminUser.lastLogin = adminUserEntity.last_login;
    adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;

    return adminUser;
  }

  private toUserEntity(adminUser: UserM): User {
    const adminUserEntity: User = new User();

    adminUserEntity.username = adminUser.username;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.last_login = adminUser.lastLogin;

    return adminUserEntity;
  }
}
