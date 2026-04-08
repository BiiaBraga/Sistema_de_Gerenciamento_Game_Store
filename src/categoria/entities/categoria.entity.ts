//importações
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Categoria{

    //atributos
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({length: 100, nullable:false})
    nome!: string;

    @IsNotEmpty()
    @Column({length: 250, nullable:false})
    descricao!: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto!: Produto[];
    
}