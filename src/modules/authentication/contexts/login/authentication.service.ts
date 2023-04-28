import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { IEncryptProvider } from '@shared/providers/EncryptProvider/encryptProvider.interface';

import { LoginRequestDTO, LoginResponseDTO } from '@modules/authentication/dto/login.dto';
import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ENCRYPT_PROVIDER)
    private readonly encryptProvider: IEncryptProvider,
  ) {}

  async execute({ email, password }: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user-not-found');
    }

    const passwordMatched = await this.encryptProvider.compareHash(password, user?.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('invalid-password');
    }
    const token = sign({}, 'testas', {
      subject: user.id,
      expiresIn: '2002s',
    });

    return { user, token };
  }
}
