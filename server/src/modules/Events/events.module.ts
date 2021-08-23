import { Module } from '@nestjs/common';
import { EventsGateway } from '../../gateway/EventsGateway/events.gateway';

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
