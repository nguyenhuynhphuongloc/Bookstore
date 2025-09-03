import { Book } from 'src/modules/books/entities/book.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, Column } from 'typeorm';


@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

 
  

  @ManyToMany(() => Book, book => book.carts)
  @JoinTable({
    name: 'cart_items',
    joinColumn: { name: 'cartId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'bookId', referencedColumnName: 'id' },
  })
  books: Book[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn() 
  user: User;
}
