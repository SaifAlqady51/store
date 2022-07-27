import User from '../types/user.type'
import db from '../database'
class UserModel{

    async create(user:User): Promise<User> {
        try{
            //open connection with query
            const connection = await db.connect();
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, user_name, first_name, last_name `;
            //run query
            const result = await connection.query(sql,[user.email,user.user_name, user.first_name,user.last_name,user.password])
            //release connectoin
            connection.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Unable to create User (${user.user_name}) ${(err as Error).message }`)
        }
    }

    async getMany() : Promise<User[]> {
        try{
            const connection = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name FROM users;`;
            const result = await connection.query(sql)
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`Unable to getMany User : ${err});
            }`)
        }
    }
    
    async getOne(id:string) : Promise<User> {
        try{
            const connection = await db.connect();
            const sql  = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=$1`
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Unable to getOne User : ${err}`)
        }
    }

    async updateOne(user:User): Promise<User> {
        try{
            const connection = await db.connect();
            const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 RETURNING id, user_name, first_name, last_name ;`;
            const result = await connection.query(sql,[user.email,user.user_name,user.first_name,user.last_name,user.password])
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Unable to delete User (${user.user_name}) ${(err as Error).message }`)
        }
    }
    async deleteOne(id:string) : Promise<User> {
        try{
            const connection = await db.connect();
            const sql  = `DELETE FROM users WHERE id=$1 RETURNING id, email, user_name, first_name, last_name`
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Unable to deleteOne User`)
        }
    }

}

export default UserModel;