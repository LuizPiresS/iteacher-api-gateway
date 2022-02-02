import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { IsCPF, IsDate } from 'brazilian-class-validator';
import { RegexHelper } from 'src/helpers/regex.helper';
import { MessageHelper } from 'src/helpers/message.helper';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsCPF()
  cpf: string;

  @ApiProperty()
  @IsDate()
  birthDate: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  cellphone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.INVALID_PASSWORD,
  })
  password: string;
}
