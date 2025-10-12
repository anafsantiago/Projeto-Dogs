import React from "react";
import styles from "./UserStatsGraph.module.css";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";

//Componente responsável por renderizar os gráficos da biblioteca Victory
const UserStatsGraph = ({ data }) => {
  const [total, setTotal] = React.useState(0); //Estado para guardar o total de acessos
  const [graph, setGraph] = React.useState([]); //Estado para guardar os dados do gráfico

  React.useEffect(() => {
    setTotal(
      data
        .map((item) => {
          return Number(item.acessos);
        })
        .reduce((acumulador, atual) => {
          return acumulador + atual;
        }, 0)
    );
    //Transforma o data para o formato a ser passado nos componentes da biblioteca de gráficos
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });
    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.graphItem} ${styles.total}`}>
        <p>Acessos: {total} </p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: { fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2 },
            labels: { fontSize: 14, fill: "#333" },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph} />
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraph;
