import { BaseEntity } from 'src/common/abstracts/baseEntity';
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { VideoType } from '../enums/video-type.enum';
import { MovieEntity } from './movie.entity';
import { EntityNames } from 'src/common/enums';

@Entity(EntityNames.videoMovie)
export class VideoEntity extends BaseEntity {
  @Column({ enum: VideoType })
  type: string;
  @Column()
  movieId: number;
  @Column()
  format: string;
  @Column()
  size: number;
  @Column()
  quality: string;
  @Column()
  path: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(()=>MovieEntity,movie=>movie.videos,{onDelete:'CASCADE'})
  movie:MovieEntity
}
