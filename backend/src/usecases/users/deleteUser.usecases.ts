import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class deleteUserUseCases {
  constructor(private readonly logger: ILogger, private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    await this.userRepository.deleteById(id);
    this.logger.log('deleteTodoUseCases execute', `Todo ${id} have been deleted`);
  }
}
