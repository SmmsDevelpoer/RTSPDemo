import { Controller, Get, Res, HttpStatus, Post, Query } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { spawn } from "child_process";
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('startRecord')
  startRecord(@Res() res: Response) {
    let time = new Date().getTime();
    let folder = '/volume1/IPCamRecord';

    let message = 'The folder is not exist.';
    if (fs.existsSync(folder)) {
      // let videoName = `${ time }.mp4`;
      // let childPs = spawn(
      //   'ffmpeg',
      //   ['-i', 'rtsp://admin:123456@192.168.50.130:554/stream1', `${ folder }/${ videoName }`]);
      // message = `Start record, PID ${ childPs.pid }`;
      message = `Start record, PID ......`;
    }

    res.status(HttpStatus.OK).send({ message: message });
  }

  @Post('stopRecord')
  stopRecord(@Res() res: Response, @Query() query: any) {
    let test = false;
    do {
      test = process.kill(query.pid);
    } while (test !== true);
    res.status(HttpStatus.OK).send({ message: 'Record stop.' });
  }
}
