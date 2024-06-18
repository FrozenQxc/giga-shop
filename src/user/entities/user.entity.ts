import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Balance } from '../../balance/entities/balance.entity'
import { Category } from '../../category/entities/category.entity'
import { Transaction } from '../../transaction/entities/transaction.entity'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@OneToMany(() => Category, (category) => category.user)
	categories: Category[]

	@OneToMany(() => Transaction, (transaction) => transaction.user, {
		onDelete: 'CASCADE',
	})
	transactions: Transaction[]

	// Баланс
	@OneToOne(() => Balance, (balance) => balance.user)
	balance: Balance

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
