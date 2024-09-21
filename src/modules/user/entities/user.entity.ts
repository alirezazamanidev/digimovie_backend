import { BaseEntity } from "src/common/abstracts/baseEntity";
import { EntityNames } from "src/common/enums";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { ActivationCodeEntity } from "./activationCode.entity";
import { WalletEntity } from "./wallet.entity";
import { PaymentEntity } from "src/modules/payment/entities/payment.entity";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {

    @Column({unique:true})
    phone:string
    @Column({unique:true,nullable:false})
    username:string
    @Column()
    @Column({nullable:true})
    activeCodeId:number
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

    @OneToOne(() => ActivationCodeEntity, (actcode) => actcode.user, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'activeCodeId' })
    token: ActivationCodeEntity;

    @OneToOne(()=>WalletEntity,wallet=>wallet.user)
    wallet:WalletEntity
    @OneToMany(()=>PaymentEntity,payment=>payment.user)
    payments:PaymentEntity[]
}