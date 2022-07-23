import User from '../types/user.type'
import db from '../database'
class UserModel{

    async create(user:User): Promise<User> {
        try{
            //open connection with query
            const connection = await db.connect();
            const sql = `INSERT INTO people (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5) returning *;`;
            //run query
            const result = await connection.query(sql,[user.email,user.user_name, user.first_name,user.last_name,user.password])
            //release connectoin
            connection.release()
            return result.rows[0]
        }catch(err){
            throw new Error('Unable to create User')
        }
    }
}

export default UserModel;