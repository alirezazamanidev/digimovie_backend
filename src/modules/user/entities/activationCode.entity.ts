import { BaseEntity } from "src/common/abstracts/baseEntity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { EntityNames } from "src/common/enums";
@Entity(EntityNames.activationCode)
export class ActivationCodeEntity extends BaseEntity {
    @Column()
    code:string
    @Column()
    expiresIn:Date
    @Column()
    userId:number
    @Column({default:false})
    used:boolean
    @OneToOne(()=>UserEntity,user=>user.token,{onDelete:'CASCADE'})
    @JoinColumn({name:'userId'})
    user:UserEntity
    @CreateDateColumn()
    created_at:Date
}