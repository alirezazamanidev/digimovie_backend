import { BaseEntity } from "src/common/abstracts/baseEntity";
import { Column, CreateDateColumn, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { EntityNames } from "src/common/enums";


@Entity(EntityNames.Wallet_user)
export class WalletEntity extends BaseEntity {

    @Column()
    userId:number
    @Column()
    amount:string
   
    @OneToOne(()=>UserEntity,user=>user,{onDelete:'CASCADE'})
    user:UserEntity
    @CreateDateColumn()
    created_at:Date
}