import { ICreateTimeDTO } from '../dto/ICreateTime.dto';
import { IFindTimeDTO } from '../dto/IFindTime.dto';
import { Time } from '../entity/Time.entity';

export interface ITimeRepository {
  create(dto: ICreateTimeDTO): Promise<Time>;
  find(dto: IFindTimeDTO): Promise<Time[]>;
  delete(timeId: string): Promise<Time>;
}
