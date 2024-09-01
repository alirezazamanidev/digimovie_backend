import { BaseEntity } from "src/common/abstracts/baseEntity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { EntityNames } from "src/common/enums";
@Entity(EntityNames.User_Otp)
export class UserOtpEntity extends BaseEntity {

    
    @Column()
    code:string
    @Column()
    expiresIn:Date
    @Column()
    userId:number
    @OneToOne(()=>UserEntity,user=>user.otp,{onDelete:'CASCADE'})
    @JoinColumn({name:'userId'})
    user:UserEntity
    @CreateDateColumn()
    created_at:Date
}