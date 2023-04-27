import { Inject, Injectable, Logger } from '@nestjs/common';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { IEncryptProvider } from '@shared/providers/EncryptProvider/encryptProvider.interface';

import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

import { userData } from './data';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    @Inject(ENCRYPT_PROVIDER)
    private readonly encryptProvider: IEncryptProvider,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  public async seed() {
    try {
      await this.user();

      this.logger.debug('Successfully completed seeding user');
    } catch (error) {
      this.logger.debug('Failed seeding user');
    }
  }

  private async user() {
    const userPromises = userData.map(async ({ name, lastName, email, password }) => {
      const user = await this.userRepository.create({
        name,
        lastName,
        email,
        password: await this.encryptProvider.generateHash(password),
      });
      return user;
    });

    return await Promise.all(userPromises);
  }
}
