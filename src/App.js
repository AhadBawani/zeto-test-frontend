
import RoutesPath from "./Routes/RoutesPath"
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userAction } from "./store/USerSlice";

function App() {
  axios.defaults.baseURL = "http://52.66.195.69:5000/"
  let userId = localStorage.getItem('id');
  const dispatch = useDispatch();
  useEffect(() => {
    if(userId){
      axios.get('User/'+userId)
        .then((response) => {
          dispatch(userAction(response.data))
          console.log(response.data)
        })
        .catch((error) => {

        })
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <RoutesPath />
        
      </BrowserRouter>

    </>
  );
}

export default App;
