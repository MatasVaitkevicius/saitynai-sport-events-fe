import { Link } from "react-router-dom";

export default function ListTypes({ data }) {
  console.log(data);
  return (
    <>
      {data.types.map((element, id) => {
        console.log(element.name);
        return (
          <Link to={`/types/${element.id}`}>
            <button id={id}>{element.name}</button>
          </Link>
        );
      })}
      <nav>
        <Link to="/">home</Link>
      </nav>
    </>
  );
}
