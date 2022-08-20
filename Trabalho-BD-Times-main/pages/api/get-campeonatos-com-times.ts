// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../lib/db";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result: any = await executeQuery({
      query: `SELECT o.nome AS ORG, t.nome as Time, t.qnt_titulos as Quantidade_de_titulos
      FROM tb_time as t
      join tb_organizacao as o on o.id_org = t.id_org
      WHERE qnt_titulos > 0
      ORDER BY qnt_titulos desc;`,
      values: [],
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500);
  }
}
