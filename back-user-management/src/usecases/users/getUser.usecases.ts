import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { UserM } from 'src/domain/model/user';

export class GetUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserM> {
    return await this.userRepository.findById(id);
  }
}
