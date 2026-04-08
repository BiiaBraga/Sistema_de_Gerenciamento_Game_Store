//importações
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ProdutoService{

    //construtor
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ){}

    //método que busca todos os produtos
    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find({
            relations:{
                categoria: true
            }
        });
    } //select * from tb_produto

    //método que busca por id
    async findById(id: number): Promise<Produto>{
        const produto = await this.produtoRepository.findOne({
            where:{
                id
            },
            relations:{
                categoria: true
            }
        });

        if(!produto)
            throw new HttpException('Produto nao encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    } //select * from tb_produto where id = id

    //metódo para encontrar as produto por nome
    async findAllByName(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations:{
                categoria: true
            }
        });
    }

    //método que cadastra produto no bd
    async create(produto: Produto): Promise<Produto>{
        await this.categoriaService.findById(produto.categoria.id);
        return await this.produtoRepository.save(produto);
    }

    //método que atualiza
    async update(produto: Produto): Promise<Produto>{
        await this.findById(produto.id);
        await this.categoriaService.findById(produto.categoria.id);
        return await this.produtoRepository.save(produto);
    }

    //metodo que deleta uma produto
    async delete(id: number):Promise <DeleteResult>{
        await this.findById(id);
        return await this.produtoRepository.delete(id);
    }

}