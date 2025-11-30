import { useEffect, useState } from 'react';
import KpiCard from './KpiCard';

export default function Dashboard() {

    const [kpis, setKpis] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/kpi")
            .then(res => res.json())
            .then(data => setKpis(data));
    }, []);

    if (!kpis) return <p>Cargando KPIs...</p>;

    return (
        <div style={{ display: 'flex', margin: '10px', gap: '20px', flexWrap: 'wrap' }}>

            <KpiCard
                titulo="Préstamos activos"
                valor={kpis.prestamosActivos}
                descripcion="Préstamos en curso"
                meta={30}
                tipo="normal"
                operador=">"
            />

            {/* <KpiCard 
                titulo="Libro sin préstamo"
                valor={kpis.diasSinPrestamo}
                descripcion="Días sin movimiento"
                meta={90}
                tipo="dias"
                operador="<"
            /> */}

            <KpiCard
                titulo="% Préstamos atrasados"
                valor={kpis.porcentajeAtrasos.toFixed(1)}
                descripcion="Control de morosidad"
                meta={10}
                tipo="porcentaje"
                operador="<"
            />

            <KpiCard
                titulo="% Libros prestados"
                valor={kpis.porcentajeLibrosPrestados.toFixed(1)}
                descripcion="Uso del inventario"
                meta={50}
                tipo="porcentaje"
                operador=">"
            />

            <KpiCard
                titulo="% Socios activos"
                valor={kpis.porcentajeSociosActivos.toFixed(1)}
                descripcion="Participación de socios"
                meta={80}
                tipo="porcentaje"
                operador=">"
            />
        </div>
    );
}
