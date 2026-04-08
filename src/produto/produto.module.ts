import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from "../categoria/categoria.module";
import { Produto } from "./entities/produto.entity";
import { Module } from "@nestjs/common";
import { ProdutoService } from "./services/produto.service";
import { ProdutosController } from "./controllers/produto.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule], 
    providers: [ProdutoService],
    controllers: [ProdutosController],
    exports: [TypeOrmModule]
})
export class ProdutoModule {}