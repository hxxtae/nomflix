import { useLocation } from 'react-router';

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  return (
    <div style={{backgroundColor: "black", width: "100%", height: "500px"}}>1</div>
  );
}

export default Search;
