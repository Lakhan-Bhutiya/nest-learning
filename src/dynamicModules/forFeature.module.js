@Module({
    imports: [
      DatabaseModule.forFeature(['User']),
    ],
  })
  export class UsersModule {}
// What happened here
// forRoot → sets DB connection
// forFeature → registers User entity
// Same module reused safely