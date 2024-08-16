import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descricao: string;

  @Column()
  caminho: string;

  @Column({ type: 'datetime' })
  dataUpload: Date;
}
