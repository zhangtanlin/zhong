import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
// entity
import allEntity from './common/allEntity'

@Module({
  imports: [
    /**
     * 导入
     * @require GraphQLModule graphql模块 
     * @require AuthorsModule 作者 
     * @require PostsModule   帖子
     */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'website',
      entities: allEntity,
      synchronize: true
    }),
    GraphQLModule.forRoot({
      // 代码优先
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // sortSchema: true,
      /**
       * 架构优先
       */
      typePaths: ['./**/*.graphql'],
    }),
    PostsModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
