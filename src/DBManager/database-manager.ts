import * as mysqlDB from 'mysql';

export abstract class DatabaseManager {
    private pool;

    constructor() {
        this.pool = mysqlDB.createPool({
            connectionLimit : 100, //important
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'address_book',
            debug    :  false
        });
    }
}