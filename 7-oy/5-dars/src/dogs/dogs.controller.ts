import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get('friend-cat')
  getFriendCat() {
    return {
      message: 'Itning mushuk dosti:',
      name: this.dogsService.getRandomFriendCat(),
    };
  }
}
