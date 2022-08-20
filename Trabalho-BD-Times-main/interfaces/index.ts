export interface ICampeonato {
  data_camp: string;
  id_camp: number;
  modalidade: number;
  premiacao: number;
  nome: string;
  qnt_times: number;
}

export interface ITime {
  id_time: number;
  modalidade: number;
  nome: string;
  qnt_titulos: number;
  org: string;
}

export interface IOrg {
  nome: string;
  cnpj: string;
  ano_fundacao: string;
  id_org: number;
}

export interface IModalidade {
  tipo: string;
  id_modalidade: number;
}

export interface IDisputa {
  id_disputa: number;
  camp: string;
  time: string;
}

export interface IJogador {
  id_jogador: number;
  time: string;
  nacionalidade: string;
  nome: string;
  data_nasc: string;
  genero: string;
  valor_passe: number;
}

export interface INascPerYear {
  year: number;
  count: number;
}
