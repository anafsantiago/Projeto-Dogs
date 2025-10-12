import React from "react";
import useFetch from "../../Hooks/useFetch";
import { STATS_GET } from "../../api";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
import Erro from "../Helper/Erro";
const UserStatsGraph = React.lazy(() => import("./UserStatsGraph")); //Componente importado usando lazy, para que seja carregado apenas no momento em que for necessário

//Componente responsável por realizar o fetch para consumir os dados estatísticos e passá-los para o componente que renderizará os gráficos da biblioteca Victory
const UserStats = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const token = window.localStorage.getItem("token");
      const { url, options } = STATS_GET(token);
      const { response, json } = await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Erro error={error} />;
  if (data)
    return (
      /*Para que o componente importando por meio do lazy possa ser utilizado, ele precisa ser chamado dentro do React.Suspense*/
      <React.Suspense fallback={<div></div>}>
        {" "}
        {/*Poderia passar o loading, mas não será necessário pois ele já foi passado mais acima*/}
        <Head
          title="Estatísticas"
          description="Página de estatísticas da conta do usuário da rede social Dogs"
        />
        <UserStatsGraph data={data} />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
