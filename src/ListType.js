export default function Type({type}) {
  console.log(type);
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
  console.log(typesData);
  return (
    <>
      {typesData.types.map((element) => {
        console.log(element.name);
        return (
          <Link to={`/types/${element.id}`}>
            <button>{element.name}</button>
          </Link>
        );
      })}
      <nav>
        <Link to="/">home</Link>
      </nav>
    </>
  );
}
