import { Controller, Get } from '@nestjs/common';
import { MSHealth } from './dto/ms-health.dto';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  //Subscribirse a los endpoints de salud de cada microservicio
  // EJEMPLO:
  //   onModuleInit() {
  //     this.msCatalogo.subscribeToResponseOf(
  //         MICROSERVICES.CATALOGO.ENDPOINTS.HEALTH
  //       );
  //   }

  //   async onModuleDestroy() {
  //     await this.msCatalogo.close();
  //   }

  @Get('/')
  getAPIHealth(): Promise<MSHealth> {
    return this.service.getAPIHealth();
  }
}
