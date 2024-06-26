import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class updateUserUseCases {
  constructor(private readonly logger: ILogger, private readonly userRepository: UserRepository) {}

  async execute(id: number, username: string, active: boolean): Promise<void> {
    await this.userRepository.updateContent(id, username, active);
    
    this.logger.log('updateTodoUseCases execute', `Todo ${id} have been updated`);
  }
}
