import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateUsersTimesRelation1682534787910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'times',
      new TableForeignKey({
        name: 'FKUserTimes',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('times', 'FKUserTimes');
  }
}
