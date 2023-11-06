// image.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn({ name: 'id' })
  imageId: number;

  @Column({ name: 'imageUrl' })
  imageUrl: string;

  @ManyToOne(() => Product, (product) => product.imageUrl)
  product: Product;
}
