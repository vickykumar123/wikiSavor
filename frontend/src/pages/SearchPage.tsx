import {useParams} from "react-router-dom";

export default function SearchPage() {
  const {city} = useParams();

  return <div>User searched for {city}</div>;
}
