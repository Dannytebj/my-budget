import  { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRO } from './user.ro';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    fullname: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    totalIncome: number;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert() 
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return bcrypt.compare(attempt, this.password);
    }

    toResponseObject(showToken: boolean = true): UserRO {
        const { id, fullname, email, totalIncome } = this;
        const responseObject: UserRO = {
          id,
          fullname,
          email,
          totalIncome,
        };
        return responseObject;
    }
}