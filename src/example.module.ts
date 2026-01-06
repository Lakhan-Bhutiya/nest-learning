import { Module, Global } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| SERVICES (Providers)
|--------------------------------------------------------------------------
*/

// Normal service
class UsersService {
  getUsers() {
    return ['user1', 'user2'];
  }
}

// Another service used inside this module
class CatsService {
  getCats() {
    return ['cat1', 'cat2'];
  }
}

/*
|--------------------------------------------------------------------------
| CUSTOM PROVIDERS
|--------------------------------------------------------------------------
*/

// useValue → static / constant value
const APP_NAME_PROVIDER = {
  provide: 'APP_NAME',
  useValue: 'NestJS Learning App',
};

// useFactory → dynamic / runtime logic
const ENV_PROVIDER = {
  provide: 'ENV_MODE',
  useFactory: () => {
    return process.env.NODE_ENV || 'development';
  },
};

// useClass → implementation mapping
class RealLoggerService {
  log(msg: string) {
    console.log('REAL:', msg);
  }
}

class FakeLoggerService {
  log(msg: string) {
    console.log('FAKE:', msg);
  }
}

const LOGGER_PROVIDER = {
  provide: 'LOGGER',
  useClass: RealLoggerService, // can be swapped with FakeLoggerService
};

/*
|--------------------------------------------------------------------------
| CONTROLLERS
|--------------------------------------------------------------------------
*/

class ExampleController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  getData() {
    return this.usersService.getUsers();
  }
}

/*
|--------------------------------------------------------------------------
| MODULE
|--------------------------------------------------------------------------
*/

/*
| @Global()
| Makes this module GLOBAL
| → You DO NOT need to import this module in other modules
| → All exported providers become available app-wide
*/
@Global()
@Module({
  /*
  |--------------------------------------------------------------------------
  | imports
  |--------------------------------------------------------------------------
  | Used to bring providers from OTHER modules
  | Example:
  | imports: [UsersModule, AuthModule]
  */
  imports: [],

  /*
  |--------------------------------------------------------------------------
  | controllers
  |--------------------------------------------------------------------------
  | HTTP entry points (routes)
  */
  controllers: [ExampleController],

  /*
  |--------------------------------------------------------------------------
  | providers
  |--------------------------------------------------------------------------
  | Everything that Nest can inject
  | Services, factories, values, classes
  */
  providers: [
    UsersService,
    CatsService,

    APP_NAME_PROVIDER,
    ENV_PROVIDER,
    LOGGER_PROVIDER,
  ],

  /*
  |--------------------------------------------------------------------------
  | exports
  |--------------------------------------------------------------------------
  | What this module exposes to OTHER modules
  | ONLY exported providers can be used outside
  */
  exports: [
    UsersService,
    'APP_NAME',
    'ENV_MODE',
    'LOGGER',
  ],
})
export class ExampleModule {}
