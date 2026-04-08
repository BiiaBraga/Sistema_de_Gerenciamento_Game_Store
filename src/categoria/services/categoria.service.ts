//importações
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoriaService{

    //construtor
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository : Repository<Categoria>
    ){}

    //metodo que encontra todas as categorias
    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations: {
                produto: true
            }
        });
    }

    //método que encontra a categoria pelo ID
    async findById(id: number): Promise<Categoria> {

        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        });

        if (!categoria)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    //método que encontra categoria pela descrição
    async findAllByDescricao(descricao: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                produto: true
            }
        })
    }

    //método que cria uma categoria nova
    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }

    //método que atualiza as informações da categoria
    async update(categoria: Categoria): Promise<Categoria> {
        await this.findById(categoria.id);
        return await this.categoriaRepository.save(categoria);
    }

    //metodo que deleta uma categoria
    async delete(id: number): Promise<DeleteResult> { 
        await this.findById(id);
        return await this.categoriaRepository.delete(id);
    }

}