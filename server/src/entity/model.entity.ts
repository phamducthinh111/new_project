import { Column } from 'typeorm';

export abstract class Model {
  @Column({ name: 'cre_dt' })
  createDate?: Date;

  @Column({ name: 'cre_usr_id' })
  createUser?: string;

  @Column({ name: 'upd_dt' })
  updateDate?: Date;

  @Column({ name: 'upd_usr_id' })
  updateUser?: string;

  @Column({ name: 'del_flag',default:false })
  delFlag?: boolean;
}
