import {Pool} from 'pg'


const urlDb=process.env.DATABASE_URL
export const pool= new Pool({
    
    connectionString:urlDb,

})