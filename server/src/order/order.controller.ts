import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/decorator/user.decorator';
import { Role } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';
import { RolesGuard } from 'src/helpers/roles.guard';
import { buyDTO } from 'src/product/product.dto';
import { OrderService } from './order.service';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @UsePipes(ValidationPipe)
  @Get()
  getAllOrder() {
    return this.orderService.getAll();
  }

  /* ORDER */
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getOrderByUser(
    @User('userId') id: string,
    @User('roles') role: string,
    @Query('status') status: Status,
  ) {
    return this.orderService.getAllByUser(id, role, status);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOrderById(
    @Param('id', ParseUUIDPipe) orderId: string,
    @User('userId') userId: string,
    @User('roles') role: Role,
  ) {
    return this.orderService.getOne(orderId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/pay')
  payOrder(
    @Param('id', ParseUUIDPipe) orderId: string,
    @User('userId') userId: string,
  ) {
    return this.orderService.changeOrderStatus(
      orderId,
      userId,
      Status.WaitingForSeller,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/received')
  confirmOrderReceived(
    @Param('id', ParseUUIDPipe) orderId: string,
    @User('userId') userId: string,
  ) {
    return this.orderService.changeOrderStatus(
      orderId,
      userId,
      Status.Completed,
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @Post('product/:id')
  async orderProduct(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) productId: string,
    @Body() data: buyDTO,
  ) {
    const test = await this.orderService.test(userId, data, productId);

    return { message: 'success' };
  }
}
