import { ApiProperty } from '@nestjs/swagger'
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
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор баланса' })
	id: number

	@Column({ type: 'decimal', default: 0 })
	@ApiProperty({ example: 100.5, description: 'Сумма на балансе' })
	amount: number

	@OneToOne(() => User)
	@JoinColumn()
	@ApiProperty({
		type: () => User,
		description: 'Пользователь, которому принадлежит баланс',
	})
	user: User
}
