import { User } from 'src/user/entities/user.entity'
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Balance {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	amount: number

	@OneToOne(() => User)
	@JoinColumn()
	user: User
}
