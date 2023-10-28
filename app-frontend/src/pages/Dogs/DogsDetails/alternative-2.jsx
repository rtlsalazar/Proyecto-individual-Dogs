// Importamos el hook useFetch
import useFetch from "./useFetch";

function DogsDetails() {
  // Obtenemos el id del parámetro de la ruta
  const { id } = useParams();

  // Creamos una variable de estado para el indicador de recarga
  const [reloadTrigger, setReload] = useState(false);

  // Llamamos al hook useFetch con la url que queremos y el id como parámetro de consulta
  // También dependemos del estado de recarga para que se ejecute cuando cambie
  const [data, loading, error] = useFetch(`https://api.example.com/dogs?id=${id}`, [reloadTrigger]);

  // Creamos una función para cambiar el estado de recarga
  const handleReload = () => {
    // Cambiamos el valor de reload al opuesto del actual
    setReloadTrigger(prev => !prev);
  };

  // Usamos el estado de carga para mostrar un mensaje o el contenido
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Usamos el estado de error para mostrar un mensaje o el contenido
  if (error) {
    return <div>Ha ocurrido un error: {error.message}</div>;
  }

  // Usamos el estado de datos para mostrar el contenido
  return (
    <>
      <main>
        <article>
          {/* Aquí puedes usar los datos que recibiste */}
          <h1>{data.name}</h1>
          <img src={data.image.url} />
          {/* ... */}
          {/* Aquí puedes usar la función handleReload para lanzar un reload */}
          <button onClick={handleReload}>Recargar</button>
        </article>
      </main>
    </>
  );
}

export default DogsDetails;
