import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Transaction } from '../../transaction/entities/transaction.entity'
import { User } from '../../user/entities/user.entity'

@Entity()
export class Category {
	@PrimaryGeneratedColumn({ name: 'category_id' })
	id: number

	@ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User

	@Column()
	title: string

	@OneToMany(() => Transaction, (transaction) => transaction.category)
	transactions: Transaction[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
