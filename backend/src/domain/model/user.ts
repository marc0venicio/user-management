export class UserWithoutPassword {
  id: number;
  username: string;
  createDate: Date;
  active: boolean;
  updatedDate: Date;
  lastLogin: Date;
  hashRefreshToken: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
