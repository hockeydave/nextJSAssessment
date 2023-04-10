let NEXT_ID: number = 1;

class Database {
    private objects: { [id: number]: any };
    private static _instance = new Database();

    constructor() {
        this.objects = {};
    }

    all() {
        return Object.values(this.objects);
    }

    find(id: number) {
        return this.objects[id];
    }

    create(record: any) {
        record.id = NEXT_ID++;
        this.objects[record.id] = record;
        return record;
    }

    update(id: number, attrs: any) {
        Object.assign(this.objects[id], attrs);
        return this.objects[id];
    }

    destroy(id: number) {
        const record = this.objects[id];
        delete this.objects[id];
        return record;
    }

    // Static instance for singleton
    static get instance() {
        return this._instance;
    }
}

const db = Database.instance;
export default db;
