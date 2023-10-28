// Importamos el hook useFetch
import useFetch from "./useFetch";

function DogsDetails() {
  // Obtenemos el id del parámetro de la ruta
  const { id } = useParams();

  // Llamamos al hook useFetch con la url que queremos y el id como parámetro de consulta
  const [data, loading, error] = useFetch(`https://api.example.com/dogs?id=${id}`);

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
        </article>
      </main>
    </>
  );
}

export default DogsDetails;
