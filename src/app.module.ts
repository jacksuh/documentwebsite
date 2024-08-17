import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Documento } from './Entity/documento.entity';
import { DocumentosController } from './Controller/documento.controller';
import { DocumentosService } from './Service/documento.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'testeE',
      password: 'teste',
      database: 'teste',
      entities: [Documento],
      synchronize: true, // use apenas em desenvolvimento
      options: {
        encrypt: true, // habilita a criptografia
        trustServerCertificate: true, // aceita certificados autoassinados
      },
    }),
    TypeOrmModule.forFeature([Documento]),
  ],
  controllers: [AppController, DocumentosController],
  providers: [AppService, DocumentosService],
})
export class AppModule {}
