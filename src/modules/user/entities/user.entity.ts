import { BaseEntity } from "src/common/abstracts/baseEntity";
import { EntityNames } from "src/common/enums";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { UserOtpEntity } from "./otp.entity";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {

    @Column({unique:true})
    phone:string
    @Column({unique:true,nullable:false})
    username:string
    @Column()
    hashedPassword:string
    @Column({nullable:false,unique:true})
    email:string
    @Column({default:false})
    phone_verify:boolean;
    @Column({default:false})
    email_verify:boolean
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    @OneToOne(() => UserOtpEntity, (otp) => otp.user, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'otpId' })
    otp: UserOtpEntity;
  
}