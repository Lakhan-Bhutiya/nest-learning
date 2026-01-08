import { Module, Global } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| EXAMPLE SERVICES (providers)
|--------------------------------------------------------------------------
| These are just placeholders to show how modules work.
| Focus on how they are USED in the module, not their logic.
*/

class UsersService {}
class AuthService {}
class LoggerService {}

/*
|--------------------------------------------------------------------------
| CUSTOM PROVIDERS
|--------------------------------------------------------------------------
*/

// Static value providerss
const APP_NAME_PROVIDER = {
  provide: 'APP_NAME',
  useValue: 'NestJS App',
};

// Factory provider (runtime logic)
const ENV_PROVIDER = {
  provide: 'ENV',
  useFactory: () => {
    return process.env.NODE_ENV || 'development';
  },
};

// Class mapping provider
const LOGGER_PROVIDER = {
  provide: 'LOGGER',
  useClass: LoggerService,
};

/*
|--------------------------------------------------------------------------
| GLOBAL MODULE
|--------------------------------------------------------------------------
| @Global()
| - Makes exported providers available everywhere
| - No need to import this module in other modules
| - Use ONLY for core/shared modules (config, logger, db)
*/

@Global()
@Module({
  /*
  |--------------------------------------------------------------------------
  | imports
  |--------------------------------------------------------------------------
  | - Used to use providers from OTHER modules
  | - Imported module MUST export the provider
  |
  | Example:
  | imports: [UsersModule, AuthModule]
  */
  imports: [],

  /*
  |--------------------------------------------------------------------------
  | controllers
  |--------------------------------------------------------------------------
  | - HTTP route handlers
  | - Controllers belong ONLY to this module
  */
  controllers: [],

  /*
  |--------------------------------------------------------------------------
  | providers
  |--------------------------------------------------------------------------
  | - Everything Nest can inject
  | - Services
  | - Custom providers (useValue, useFactory, useClass)
  */
  providers: [
    UsersService,
    AuthService,

    APP_NAME_PROVIDER,
    ENV_PROVIDER,
    LOGGER_PROVIDER,
  ],

  /* 
  |--------------------------------------------------------------------------
  | exports
  |--------------------------------------------------------------------------
  | - What this module exposes to OTHER modules
  | - ONLY exported providers can be used outside
  | - Controllers are NEVER exported
  */
  exports: [
    UsersService,
    'APP_NAME',
    'ENV',
    'LOGGER',
  ],
})
export class AppModule {}
// @Module({
//     imports    → take from others
//     providers  → create here
//     exports    → give to others
//     controllers→ handle routes
//   })
  
/*
📁 users.module.ts
import { Module } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| USERS MODULE
|--------------------------------------------------------------------------
| - Owns UsersService
| - Exports UsersService so OTHER modules can use it


class UsersService {}

// @Module({
//   /*
//   | providers
//   | UsersService belongs to THIS module
//   */
//   providers: [UsersService],

//   /*
//   | exports
//   | Makes UsersService available to OTHER modules
//   */
//   exports: [UsersService],
// })
// export class UsersModule {}

// 📁 auth.module.ts


// import { Module } from '@nestjs/common';
// import { UsersModule } from '../users/users.module';

// /*
// |--------------------------------------------------------------------------
// | AUTH MODULE
// |--------------------------------------------------------------------------
// | - Needs UsersService
// | - Imports UsersModule
// | - DOES NOT re-provide UsersService
// */

// class AuthService {}

// @Module({
//   /*
//   | imports
//   | Brings exported providers from UsersModule
//   */
//   imports: [UsersModule],

//   /*
//   | providers
//   | Only AuthService belongs here
//   */
//   providers: [AuthService],

//   /*
//   | exports
//   | (optional) export AuthService for other modules
//   */
//   exports: [AuthService],
// })
// export class AuthModule {}
// 📁 app.module.ts
// import { Module } from '@nestjs/common';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';

// /*
// |--------------------------------------------------------------------------
// | ROOT MODULE
// |--------------------------------------------------------------------------
// | - Assembles application modules
// | - No providers needed here
// */

// @Module({
//   imports: [
//     UsersModule,
//     AuthModule,
//   ],
// })
// export class AppModule {}
