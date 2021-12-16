export default function Type({type}) {
  return (
    <>
      {typesData.types.map((element) => {
        return (
          <div>{element.id}</div>
        );
      })}
      <nav>
        <Link to="/">home</Link>
      </nav>
    </>
  );
}
export default function ListTypes({ typesData }) {
  return (
    <>
      {typesData.types.map((element) => {
        return (
          <>
          <Link to={`/types/${element.id}`}>
            <button>{element.name}</button>
          </Link>
          </>
        );
      })}
      <nav>
        <Link to="/">home</Link>
      </nav>
    </>
  );
}
