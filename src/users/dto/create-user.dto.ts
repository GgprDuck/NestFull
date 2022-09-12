export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  isEnabled?: boolean;
}
