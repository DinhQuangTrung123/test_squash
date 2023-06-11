import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
// {
//     "name123"
// }
import { TitleEntity } from 'src/titles/entity/title.entity';

@Entity({
    // name:"supplier"
})
export class SupplierEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        // name:'name123'
    })
    name: string;

    @Column({
        type: 'varchar',
        comment: 'Address Supplier',
    })
    address: string;

    @Column()
    phone: number

    @ManyToMany(() => TitleEntity)
    @JoinColumn({
        referencedColumnName: 'id',
      })
    title: TitleEntity[]

}

export class SupplierEntity2 extends TitleEntity { }

