import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { GetUserUseCases } from 'src/usecases/users/getUser.usecases';
import { getUsersUseCases } from 'src/usecases/users/getUsers.usecases';
import { updateUserUseCases } from 'src/usecases/users/updateUser.usecases';
import { UserPresenter } from './user.presenter';
import { deleteUserUseCases } from 'src/usecases/users/deleteUser.usecases';
import { addUserUseCases } from 'src/usecases/users/addUser.usecases';
import { AddUserDto, UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetUserUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getAllUsersUsecaseProxy: UseCaseProxy<getUsersUseCases>,
    @Inject(UsecasesProxyModule.PUT_USER_USECASES_PROXY)
    private readonly updateUserUsecaseProxy: UseCaseProxy<updateUserUseCases>,
    @Inject(UsecasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly deleteUserUsecaseProxy: UseCaseProxy<deleteUserUseCases>,
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<addUserUseCases>,
  ) {}

  @Get('user')
  @ApiResponseType(UserPresenter, true)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(UserPresenter, false)
  async getTodo(@Query('id', ParseIntPipe) id: number) {
    const user = await this.getUserUsecaseProxy.getInstance().execute(id);
    return new UserPresenter(user);
  }

  @Get('users')
  @ApiResponseType(UserPresenter, true)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(UserPresenter, true)
  async getTodos() {
    const users = await this.getAllUsersUsecaseProxy.getInstance().execute();
    return users.map((user) => new UserPresenter(user));
  }

  @Put('user')
  @ApiResponseType(UserPresenter, true)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(UserPresenter, true)
  async updateTodo(@Body() updateUserDto: UpdateUserDto) {
    const { id, active, username } = updateUserDto;
    await this.updateUserUsecaseProxy.getInstance().execute(id, username, active);
    return 'success';
  }

  @Delete('user')
  @ApiResponseType(UserPresenter, true)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(UserPresenter, true)
  async deleteTodo(@Query('id', ParseIntPipe) id: number) {
    await this.deleteUserUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('user')
  @ApiResponseType(UserPresenter, true)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is_authenticated' })
  async addUser(@Body() addUserDto: AddUserDto) {

    const { username, password, email } = addUserDto;

    const todoCreated = await this.addUserUsecaseProxy.getInstance().execute({
      username: username, 
      password: password
    });

    return new UserPresenter(todoCreated);
  }
}
