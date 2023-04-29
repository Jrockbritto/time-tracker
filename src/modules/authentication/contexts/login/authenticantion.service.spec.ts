import { UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { InMemoryEncrypt } from '@shared/providers/EncryptProvider/implementations/inMemory.provider';

import { InMemoryUserRepository } from '@modules/users/repositories/implementations/inMemory.repository';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let inMemoryUserRepository: InMemoryUserRepository;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
        { provide: ENCRYPT_PROVIDER, useClass: InMemoryEncrypt },
      ],
    }).compile();

    inMemoryUserRepository = moduleRef.get<InMemoryUserRepository>(USER_REPOSITORY);
    authenticationService = moduleRef.get<AuthenticationService>(AuthenticationService);
  });

  it('should validate and return the user data', async () => {
    const user = await inMemoryUserRepository.create({
      email: 'user@example.com',
      password: 'password',
      name: 'john',
      lastName: 'doe',
    });

    const { email, password } = user;

    const result = await authenticationService.execute({ email, password });
    expect(result.user.id).toBe(user.id);
    expect(result).toHaveProperty('token');
  });

  it('should return a UnauthorizedException when wrong email is provided', async () => {
    const user = await inMemoryUserRepository.create({
      email: 'user@example.com',
      password: 'password',
      name: 'john',
      lastName: 'doe',
    });

    const { email, password } = user;

    await expect(
      authenticationService.execute({ email: `wrong${email}`, password }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should return a UnauthorizedException when wrong password is provided', async () => {
    const user = await inMemoryUserRepository.create({
      email: 'user@example.com',
      password: 'password',
      name: 'john',
      lastName: 'doe',
    });

    const { email, password } = user;

    await expect(
      authenticationService.execute({ email, password: `wrong${password}` }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should return a UnauthorizedException when user does not exist', async () => {
    const user = { email: 'user@example.com', password: 'password' };

    const { email, password } = user;

    await expect(authenticationService.execute({ email, password })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
