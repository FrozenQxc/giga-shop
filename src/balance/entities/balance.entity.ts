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

	@Column({ type: 'decimal', default: 0 })
	amount: number

	@OneToOne(() => User)
	@JoinColumn()
	user: User
}
