import { BaseEntity } from 'src/common/abstracts/baseEntity';
import { EntityNames } from 'src/common/enums';
import { UserEntity } from 'src/modules/user/entities';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity(EntityNames.Payment)
export class PaymentEntity extends BaseEntity {
  @Column()
  userId: number;
  @Column()
  amount: string;
  @Column({ default: false })
  status: boolean;
  @Column({ unique: true })
  invoice_number: string;
  @Column()
  type:string
  @Column({ nullable: true })
  refId: string;
  @Column({ nullable: true })
  authority: string;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne(()=>UserEntity,user=>user.payments,{onDelete:'CASCADE'})
  user:UserEntity
}
