/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { printSchema } from 'graphql';
import { join } from 'path';
import { ProjectModule } from './project/project.module';
import { DesignModule } from './designer/designer.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'api/src/schema.gql'),
      sortSchema: true,
      transformSchema: (schema) => {
        console.log(printSchema(schema));
        return schema;
      },
    }),
    MongooseModule.forRoot(`mongodb+srv://vinayaksukhalal:vinu123@cluster0.oxv3v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`),
    ProjectModule,
    DesignModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
  }
}
