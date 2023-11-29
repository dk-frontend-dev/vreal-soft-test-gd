import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  public healthCheck(): {status: number} {
    return {
      status: 0
    };
  }
}
