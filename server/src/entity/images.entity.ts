// image.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn({ name: 'id' })
  imageId: number;

  @Column({ length: 255 })
  imageUrl: string;

  @Column({ type: 'enum', enum: ['thumbnail', 'gallery'], default: 'gallery' })
  imageType: 'thumbnail' | 'gallery';

  @ManyToOne(() => Product, (product) => product.imageUrl)
  product: Product;

}
