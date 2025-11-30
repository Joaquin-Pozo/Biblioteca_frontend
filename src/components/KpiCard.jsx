import './KpiCard.css';

export default function KpiCard({ 
  titulo, 
  valor, 
  descripcion, 
  meta, 
  tipo = "normal",
  operador = "<="
}) {

  let cumpleMeta = true;

  if (tipo === "porcentaje" || tipo === "dias" || tipo === "normal") {
    switch (operador) {
      case "<":
        cumpleMeta = valor < meta;
        break;
      case ">":
        cumpleMeta = valor > meta;
        break;
      case "<=":
        cumpleMeta = valor <= meta;
        break;
      case ">=":
        cumpleMeta = valor >= meta;
        break;
      default:
        cumpleMeta = true;
    }
  }

  return (
    <div className={`kpi-card ${cumpleMeta ? 'ok' : 'alerta'}`}>
      <h4>{titulo}</h4>

      <h2>
        {valor}
        {tipo === "porcentaje" && "%"}
        {tipo === "dias" && " días"}
      </h2>

      <p>{descripcion}</p>

      <span className="meta">
        Meta: {operador} {meta}
        {tipo === "porcentaje" && "%"}
        {tipo === "dias" && " días"}
      </span>
    </div>
  );
}

