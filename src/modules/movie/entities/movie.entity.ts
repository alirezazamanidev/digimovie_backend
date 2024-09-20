import { BaseEntity } from "src/common/abstracts/baseEntity";
import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { VideoEntity } from "./video.entity";
import { EntityNames } from "src/common/enums";

@Entity(EntityNames.Movie)
export class MovieEntity extends BaseEntity {
    @Column()
    title:string
    @Column({unique:true})
    slug:string
    @Column()
    content:string
    @Column()
    quality:string
    @Column({type:'simple-array'})
    productOfCountry:string[]
    @Column()
    directorName:string
    @Column()
    authorName:string
    @Column()
    thumbImageUrl:string
    @Column()
    trailervideoUrl:string
    @Column()
    backgroundImageUrl:string
    @Column({default:false})
    showOnline:boolean
    @Column({type:'simple-array'})
    tags:string[]
    @Column({type:'decimal'})
    score:number
    @Column({default:false})
    censored:boolean
    @Column({type:'simple-array'})
    actorsNames:string[]
    @OneToMany(()=>VideoEntity,video=>video.movie)
    videos:VideoEntity[]
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
}