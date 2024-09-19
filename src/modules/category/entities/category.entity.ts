import { BaseEntity } from "src/common/abstracts/baseEntity";
import { EntityNames } from "src/common/enums";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";


@Entity(EntityNames.Category)
export class CategoryEntity extends BaseEntity {
    @Column()
    title:string
    @Column({unique:true})
    slug:string
    @Column({nullable:true})
    description:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
}