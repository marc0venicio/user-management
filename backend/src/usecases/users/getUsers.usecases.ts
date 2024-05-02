import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { UserM } from 'src/domain/model/user';

export class getUsersUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserM[]> {
    return await this.userRepository.findAll();
  }
}
