import db from '../db';
import User from '../models/user.mdels'
import DatabaseError from '../models/errors/database.error.model'

class UserRepository {

  async findByUsernameAndPassword( username:string, password:string): Promise<User | null>{
    try {
     const query = `
      SELECT uuid, username FROM
      application_user
      WHERE username = $1 AND
      password = crypt($2, 'my_salt')
    `;
    const values = [username, password]
    const { rows } = await db.query<User>(query, values)
    const [user] = rows;
    return user || null
       
    } catch (e) {
      /* handle error */
      throw new DatabaseError('Error en la consulta por username y password', e);
    }

}
  async findAllUsers(): Promise<User[]> {
    try {
    const query = `
    SELECT uuid, username  
    FROM application_user
    `;
    const { rows } = await db.query<User>(query);    
    return rows || [];  
    } catch (e) {
      /* handle error */
      console.log(e)
      throw new DatabaseError("error en la busqueda total");
    }
    
  }

  async findUserById(uuid: string): Promise<User> {
    try {
     const query = `
    SELECT uuid, username 
    FROM application_user
    WHERE uuid = $1
    `;
    const values = [uuid];
    const { rows } = await db.query<User>(query, values);    
    const [ user ] = rows;
    return user;
    } catch (e) {
      /* handle error */
      console.log(e);
      // throw new DatabaseError('Error en la consulta por ID', e);
    }
}

  async create(user: User): Promise<string>{
    const script = `
    INSERT INTO application_user (
      username,
      password
    )
    VALUES($1, crypt($2, 'my_salt'))
    RETURNING uuid
    `;
    const values = [user.username, user.password ];
    const { rows } = await db.query<{uuid: string}>(script, values)
    const [newUser] = rows;
    return newUser.uuid
  }
  

  async update(user: User): Promise<void>{
    const script = `
    UPDATE application_user 
    SET
      username = $1,
      password = crypt($2, 'my_salt')
    WHERE uuid = $3
    `;
    const values = [user.username, user.password, user.uuid ];
    await db.query(script, values)
  }


  async remove(uuid: string): Promise<void>{
    const script = `
    DELETE 
    FROM application_user  
    WHERE uuid = $1
    `;
    const values = [uuid];
    await db.query(script, values)
  }

};
export default new UserRepository();
