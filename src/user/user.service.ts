import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    })
    if (existUser) throw new BadRequestException('User already exist')

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    })

    const token = this.jwtService.sign({ email: createUserDto.email })

    return { user, token }
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email: email } })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
}
