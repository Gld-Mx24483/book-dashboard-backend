
// import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { BookModule } from './book/book.module';
// import { join } from 'path';
// import { SwaggerModule } from '@nestjs/swagger';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'sqlite',
//       database: './book-dashboard.sqlite',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true,
//     }),
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
//       playground: true,
//     }),
//     BookModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './book-dashboard.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    BookModule,
    AuthModule,
  ],
})
export class AppModule {}