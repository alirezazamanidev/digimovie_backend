import { BaseEntity } from "src/common/abstracts/baseEntity";
import { EntityNames } from "src/common/enums";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { UserOtpEntity } from "./otp.entity";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {

    @Column({unique:true})
    phone:string
    @Column({unique:true,nullable:true})
    username:string
    @Column({nullable:true})
    fullname:string
    @Column({nullable:true,unique:true})
    email:string
    @Column({default:false})
    phone_verify:boolean;
    @Column({nullable:true})
    otpId:number
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    @OneToOne(() => UserOtpEntity, (otp) => otp.user, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'otpId' })
    otp: UserOtpEntity;
  
}