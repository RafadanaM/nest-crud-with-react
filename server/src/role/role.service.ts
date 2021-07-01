import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async getOneRole(name: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({ where: { name: name } });
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }

    return role;
  }
}
