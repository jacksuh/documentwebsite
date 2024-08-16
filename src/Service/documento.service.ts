import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from '../Entity/documento.entity';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private documentosRepository: Repository<Documento>,
  ) {}

  async uploadDocumento(titulo: string, descricao: string, caminho: string): Promise<Documento> {
    const documento = this.documentosRepository.create({ titulo, descricao, caminho, dataUpload: new Date() });
    return this.documentosRepository.save(documento);
  }

  async getDocumentos(): Promise<Documento[]> {
    return this.documentosRepository.find();
  }

  async getDocumento(id: number): Promise<Documento> {
    return this.documentosRepository.findOne({ where: { id: id } });
  }
}
