import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { IUser } from 'src/types/types'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: IUser) {
    const { id, email } = user

    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email)

    const passwordIsMatch = await argon2.verify(user.password, password)

    if (user && passwordIsMatch) {
      return user
    }
    throw new UnauthorizedException('Пароль не подошел')
  }
}
