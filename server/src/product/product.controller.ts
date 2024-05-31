import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/createProduct.dto";
import { ResponseObject } from "src/libs/response-object";
import { Response } from "express";
import { FileInterceptor } from '@nestjs/platform-express';
import { SERVER_ERROR_MESSAGE } from "src/libs/constants";
import { storageConfig } from "helpers/config";
import { UpdateProductDto } from "./dto/updatePeoduct.dto";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "src/libs/decorators/public.decorators";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createProDuct(
        @Body() createProductDto: CreateProductDto,
        @Res() res: Response,

    ) {
        try {
            const result = await this.productService.createProduct(createProductDto)
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error)
            return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(ResponseObject.fail(SERVER_ERROR_MESSAGE))
        }
        // console.log('product')
        // console.log(file);
    }

    @Post('upload-img/:productId')
    @UseInterceptors(FileInterceptor('imageUrl',{
        storage: storageConfig('product')}))
    async uploadFile(
        // @Body() createProductDto: CreateProductDto,
        @Param('productId') productId: number,
        @Res() res: Response,
        @UploadedFile() file: Express.Multer.File
    ) {     
        // console.log('product')
        // console.log(file);
        // console.log(productId)
        try {
            const result = await this.productService.upLoadImage(productId,file.destination+'/'+file.filename )
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error)
            return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(ResponseObject.fail(SERVER_ERROR_MESSAGE))
        }
    }

    @Public()
    @Get()
    async getAllProduct(@Res() res: Response) {
        try {
            const result = await this.productService.getAllProduct()
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @Get(':productId')
    async getProductById(
        @Res() res: Response,
        @Param('productId') productId: number
    ) {
        try {
            const result = await this.productService.getProductById(productId);
            if (!result) {
                return res.status(HttpStatus.NOT_FOUND).send(ResponseObject.fail('User not found'));
            }
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @Put(':productId')
    async updateProductById(
        @Res() res: Response,
        @Param('productId') productId: number,
        @Body() updateProductDto : UpdateProductDto
    ) {
        try {
            const result = await this.productService.updateProductById(productId, updateProductDto);
            if (!result) {
                return res.status(HttpStatus.NOT_FOUND).send(ResponseObject.fail('User not found'));
            }
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @Delete(':productId/images/:imageId')
    async deleteImage(
        @Res() res: Response,
        @Param('productId') productId: any,
        @Param('imageId') imageId: number
    ) {
        try {
            await this.productService.deletedImages(productId,imageId);
            return res.send(ResponseObject.success('Image deleted successfully'));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @Delete(':productId')
    async deleteProduct(
        @Res() res: Response,
        @Param('productId') productId: any
    ) {
        try {
            await this.productService.deleteProduct(productId);
            return res.send(ResponseObject.success('Product deleted successfully'));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }
}