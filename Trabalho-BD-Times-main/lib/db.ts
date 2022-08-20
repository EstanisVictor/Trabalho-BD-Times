import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: "127.0.0.1",
    port: 3306,
    database: "gerenciadordetimes",
    user: "root",
    password: "jiwk3",
  },
});

interface IQuery {
  query: string;
  values?: any[];
}

export default async function executeQuery({ query, values }: IQuery) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    console.log(error);

    return { error };
  }
}
