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

  async createRoles(): Promise<string> {
    const roleAdmin = await this.roleRepository.create({
      name: 'Admin',
    });
    await this.roleRepository.save(roleAdmin);
    const roleBuyer = await this.roleRepository.create({
      name: 'Buyer',
    });
    await this.roleRepository.save(roleBuyer);
    const roleSeller = await this.roleRepository.create({
      name: 'Seller',
    });
    await this.roleRepository.save(roleSeller);
    return 'roles added succesfully';
  }

  async getOneRole(name: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({ where: { name: name } });
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }

    return role;
  }
}
