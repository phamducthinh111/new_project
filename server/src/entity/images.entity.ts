// image.entity.ts
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn({ name: 'id' })
  imageId: number;

  @Column({ name: 'imageUrl', length: 255 })
  imageUrl: string;

  @ManyToOne(() => Product, (product) => product.imageUrl)
  product: Product;

  @ManyToOne(() => Product, (product) => product.imageTitle)
  productTitle: Product;

}
