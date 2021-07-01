import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/decorator/user.decorator';
import { OrderAction } from 'src/enums/action.enum';
import { Role } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';
import { RolesGuard } from 'src/helpers/roles.guard';
import { OrderItemService } from './order-item.service';

@Controller('api/order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @UsePipes(ValidationPipe)
  @Get('seller')
  getOrderItemByUser(@User('userId') userId: string) {
    return this.orderItemService.getAllBySeller(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @UsePipes(ValidationPipe)
  @Get('status')
  getOrderItemByStatus(
    @User('userId') userId: string,
    @Query('status') status: Status,
  ) {
    return this.orderItemService.getByStatus(userId, status);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Seller')
  @UsePipes(ValidationPipe)
  @Post(':id')
  confirmOrderItem(
    @Param('id', ParseUUIDPipe) orderItemId: string,
    @Query('action') action: OrderAction,
    @User('userId') userId: string,
  ) {
    return this.orderItemService.sellerAction(orderItemId, userId, action);
  }
}
