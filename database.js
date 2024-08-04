

class database {
    constructor(cli,conn) {
        this.mongoclient = cli;
        this.conn = conn;
    }

    async exists(query) {
        let num = await global.db.conn.collection("members").count(query,{ limit: 1 });
        return num >= 1;
    }

    async update(data) {
        await this.conn.collection("members").updateOne(
            { _id: data._id },
            { $set: { name: data.name, emote: data.emote } },
            { upsert: true }

        );
    }
    async addEntry(data) {
        await this.conn.collection("members").insertOne(data);
    }

    async getEntry(query) {
        return await this.conn.collection("members").findOne(query);
    }

    async getEntries() {
		const cursor = this.conn.collection("members").find({})
	    const allValues = await cursor.toArray();
		// console.log(allValues);
        return allValues;
    }
}

module.exports = database;