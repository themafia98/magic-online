import {
  Controller,
  Get,
  Param,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { GlobalExceptionFilter } from '../../filters/GlobalExceptionFilter/GlobalExcepationFilter';
import { JwtGuard } from '../Auth/guard/jwt.guard';
import { join } from 'path';

@Controller('/canvas')
@UseFilters(GlobalExceptionFilter)
export class AppController {
  private readonly static: { root: string } = {
    root: join(__dirname, '..', '..', 'static'),
  };

  @UseGuards(JwtGuard)
  @Get('/sprite/map')
  getMapTileSheet(@Res() res, @Param() params) {
    return res.sendFile('tilesheet.png', this.static);
  }

  @UseGuards(JwtGuard)
  @Get('/map/master')
  getMapMasterChunk(@Res() res, @Param() params) {
    return res.sendFile('chunks/master.json', this.static);
  }

  @UseGuards(JwtGuard)
  @Get('/map/chunk/:id')
  getMapChunk(@Res() res, @Param() params) {
    return res.sendFile(`chunks/chunk${params.id}.json`, this.static);
  }
}
