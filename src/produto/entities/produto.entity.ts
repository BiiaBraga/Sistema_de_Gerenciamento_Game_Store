//importações
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity()
export class Produto{

    //atributos
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({length:100, nullable:false})
    nome!: string;

    @IsNotEmpty()
    @Column({type: 'decimal', nullable:false, precision:7, scale:2})
    preco!: number;

    @IsNotEmpty()
    @Column({length: 255})
    descricao!: string;

    @IsNotEmpty()
    @Column({type: 'int', nullable: false})
    estoque!: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto,{
        onDelete: 'CASCADE',
    })
    categoria!: Categoria;
}