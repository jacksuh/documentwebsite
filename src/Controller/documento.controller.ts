import { Controller, Get, Post, Param, Body, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentosService } from '../Service/documento.service';
import { Documento } from '../Entity/documento.entity';
import { multerConfig } from '../upload.config';
import * as path from 'path';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadDocumento(
    @Body() body: { titulo: string; descricao: string },
    @UploadedFile() file: any,
  ): Promise<Documento> {
    const caminho = `D:/uploads/${file.filename}`; // Caminho relativo
    return this.documentosService.uploadDocumento(body.titulo, body.descricao, caminho);
  }

  @Get()
  async getDocumentos(): Promise<Documento[]> {
    return this.documentosService.getDocumentos();
  }

  @Get('download/:id')
  async downloadDocumento(@Param('id') id: number, @Res() res): Promise<any> {
    const documento = await this.documentosService.getDocumento(id);
    
    // Corrigir o caminho para garantir que ele seja resolvido corretamente
    const filePath = path.join('D:/uploads', path.basename(documento.caminho));

    // Configura o cabeçalho Content-Disposition como inline para exibir no navegador
    res.setHeader('Content-Disposition', 'inline; filename=' + path.basename(filePath));
    res.setHeader('Content-Type', 'application/pdf');

    return res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).json({ message: "Arquivo não encontrado." });
      }
    });
  }
}
