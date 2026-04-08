//importações
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

//Controller
@Controller("/categorias")
export class CategoriaController{
    
    //construtor
    constructor(private readonly categoriaService: CategoriaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }
    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number): Promise <Categoria>{
        return this.categoriaService.findById(id);
    }
    
    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findAllByDescricao(@Param('descricao') descricao: string): Promise <Categoria[]>{
        return this.categoriaService.findAllByDescricao(descricao);
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria:Categoria): Promise<Categoria>{
        return this.categoriaService.create(categoria);
    }
    
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria:Categoria): Promise<Categoria>{
        return this,this.categoriaService.update(categoria);
    }
    
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id:number){
        return this.categoriaService.delete(id);
    }

}