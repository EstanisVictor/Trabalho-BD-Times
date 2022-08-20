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
      query: `SELECT o.nome AS ORG, t.qnt_titulos as Quantidade_de_titulos, COUNT(j.id_time)  as Media_de_titulos
      from tb_organizacao as o 
      join tb_time as t on o.id_org = t.id_org
      join tb_modalidade as m on m.id_modalidade = t.modalidade
      join tb_jogador as j on j.id_time = t.id_time
      where t.qnt_titulos = (SELECT MAX(qnt_titulos)
        FROM tb_time as tim
        join tb_modalidade as m on m.id_modalidade = tim.modalidade
        where m.tipo = 'Futebol') 
      and m.tipo = 'Futebol'
      having COUNT(j.id_time) > 0;`,
      values: [],
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500);
  }
}
