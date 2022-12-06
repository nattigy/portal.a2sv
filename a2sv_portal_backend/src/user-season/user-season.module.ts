import { Module } from '@nestjs/common';
import { UserSeasonService } from './user-season.service';
import { UserSeasonResolver } from './user-season.resolver';

@Module({
  providers: [UserSeasonResolver, UserSeasonService]
})
export class UserSeasonModule {}
