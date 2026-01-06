// Configure this module once for the whole application
// Used for:
// DB connection
// JWT secret
// Global config
// Logger

import { Module } from "@nestjs/common";


@Module({})
export class ConfigModule {
  static forRoot(options: { env: string }) {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: ['CONFIG_OPTIONS'],
    };
  }
}
