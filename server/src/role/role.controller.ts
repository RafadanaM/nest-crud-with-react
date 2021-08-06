import { Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('api/role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  getAllProduct() {
    return this.roleService.createRoles();
  }
}
