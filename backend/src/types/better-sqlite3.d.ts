declare module 'better-sqlite3' {
  function Database(filename: string, options?: any): Database;
  class Database {
    constructor(filename: string, options?: any);
    exec(sql: string): this;
    prepare(sql: string): Statement;
    close(): void;
  }
  class Statement {
    bind(...params: any[]): this;
    run(...params: any[]): { changes: number; lastInsertRowid: number };
    get(...params: any[]): any;
    all(...params: any[]): any[];
    iterate(...params: any[]): IterableIterator<any>;
  }
  export = Database;
}