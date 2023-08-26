import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class RoutesDriverService {
  constructor(private prismaService: PrismaService) { }

  async createOrUpdate(dto: { route_id: string; lat: number; lgn: number }) {
    return await this.prismaService.routeDriver.upsert({
      include: {
        route: true,
      },
      where: {
        routeId: dto.route_id,
      },
      create: {
        routeId: dto.route_id,
        points: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lgn,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lgn,
            },
          },
        },
      },
    });
  }
}
