//user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOrCreateUser(
    auth0Id: string, 
    email: string, 
    name?: string, 
    picture?: string
  ): Promise<User> {
    // Try to find existing user
    let user = await this.userRepository.findOne({ 
      where: [
        { auth0Id },
        { email }
      ] 
    });

    // If user doesn't exist, create new user
    if (!user) {
      user = this.userRepository.create({
        auth0Id,
        email,
        name,
        picture,
        roles: ['user'] // Default role
      });
      await this.userRepository.save(user);
    }

    return user;
  }

  async findByAuth0Id(auth0Id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { auth0Id } });
  }
}