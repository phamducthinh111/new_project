import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ResponseObject } from 'src/libs/response-object';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { storageConfig } from 'helpers/config';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Public } from 'src/libs/decorators/public.decorators';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';

@Controller('product')

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createProDuct(
    @CurrentUser('userId') currentUserId,
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.productService.createProduct(currentUserId, createProductDto);
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Public()
  @Post('upload-img/:productId')
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      storage: storageConfig('product'),
    }),
  )
  async uploadListImage(
    @CurrentUser('userId') currentUserId,
    @Param('productId') productId: number,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      // const filePath = `uploads/product/${file.filename}`;
      // const fileUrl = `${req.protocol}://${req.get('Host')}/${filePath}`;
      const result = await this.productService.upLoadListImage(
        currentUserId,
        productId,
        file.destination + '/' + file.filename
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Public()
  @Post('upload-titleImg/:productId')
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      storage: storageConfig('product'),
    }),
  )
  async uploadTitleImage(
    // @Body() createProductDto: CreateProductDto,
    @CurrentUser('userId') currentUserId,
    @Param('productId') productId: number,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const result = await this.productService.upLoadTopicImage(
        currentUserId,
        productId,
        file.destination + '/' + file.filename
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
      .status(HttpStatus.BAD_REQUEST)
      .send(ResponseObject.fail(error.response.message));
    }
  }

  @Public()
  @Get('search')
  async getSearchSuggestions(
    @Res() res: Response,
    @Query('name') name: string,
    @Query('delFlag') delFlag?: string,
  ) {
    try {
      const delFlagValue = delFlag === 'true' ? true : false;
      const result = await this.productService.getSearchSuggestions(name, delFlagValue);
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  // @Public()
  @Get()
  async getAllProduct(
    @Res() res: Response,
    @CurrentUser('userId') currentUserId,
    @Query('name') name: string,
    @Query('delFlag') delFlag?: string,
  ) {
    try {
      const delFlagValue = delFlag === 'true';
      const result = await this.productService.getAllProduct(currentUserId, name, delFlagValue, );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
      .status(HttpStatus.BAD_REQUEST)
      .send(ResponseObject.fail(error.response.message));
    }
  }

  @Get(':productId')
  async getProductById(
    @Res() res: Response,
    @Param('productId') productId: number,
  ) {
    try {
      const result = await this.productService.getProductById(productId);
      if (!result) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(ResponseObject.fail('User not found'));
      }
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
      .status(HttpStatus.BAD_REQUEST)
      .send(ResponseObject.fail(error.response.message));
    }
  }

  @Put(':productId')
  async updateProductById(
    @Res() res: Response,
    @Param('productId') productId: number,
    @CurrentUser('userId') currentUserId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const result = await this.productService.updateProductById(
        currentUserId,
        productId,
        updateProductDto,
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
      .status(HttpStatus.BAD_REQUEST)
      .send(ResponseObject.fail(error.response.message));
    }
  }

  @Delete(':productId/images/:imageId')
  async deleteImage(
    @Res() res: Response,
    @Param('productId') productId: any,
    @Param('imageId') imageId: number,
  ) {
    try {
      await this.productService.deletedImages(productId, imageId);
      return res.send(ResponseObject.success('Image deleted successfully'));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Delete('remove/:productId')
  async reomoveProduct(
    @Res() res: Response,
    @Param('productId') productId: any,
    @CurrentUser('userId') currentUserId,

  ) {
    try {
      await this.productService.removeProduct(currentUserId, productId);
      return res.send(ResponseObject.success('Product remove successfully'));
    } catch (error) {
      console.log(error);
      return res
      .status(HttpStatus.BAD_REQUEST)
      .send(ResponseObject.fail(error.response.message));
    }
  }

  @Put('rollback/:productId')
  async rollBackProductByAdmin(
    @Res() res: Response,
    @Param('productId') productId: any,
    @CurrentUser('userId') currentUserId,

  ) {
    try {
      await this.productService.rollBackProductByAdmin(currentUserId, productId);
      return res.send(ResponseObject.success('Product rollback successfully'));
    } catch (error) {
      console.log(error);
      return res
      .status(HttpStatus.BAD_REQUEST)
      .send(ResponseObject.fail(error.response.message));
    }
  }

  @Delete('delete/:productId')
  async deleteProductByAdmin(
    @Res() res: Response,
    @Param('productId') productId: any,
    @CurrentUser('userId') currentUserId,

  ) {
    try {
      await this.productService.deleteProduct(currentUserId, productId);
      return res.send(ResponseObject.success('Product deleted successfully'));
    } catch (error) {
      console.log(error);
      return res
      .status(HttpStatus.BAD_REQUEST)
      .send(ResponseObject.fail(error.response.message));
    }
  }
}
