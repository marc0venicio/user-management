import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from 'src/domain/model/user';

export class addUserUseCases {
  constructor(private readonly logger: ILogger, private readonly userRepository: UserRepository) {}

  async execute({username, password}): Promise<UserM> {
    const user = new UserM();

    user.username = username;
    user.password = password;
    user.active = true;
    const result = await this.userRepository.insert(user);
    this.logger.log('addTodoUseCases execute', 'New todo have been inserted');
    return result;
  }
}
