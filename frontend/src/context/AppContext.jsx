import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { doctors as localDoctors } from "../assets/assets";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [doctors, setDoctors] = useState([]);
  const backendUrl = "http://localhost:5000";

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData, setUserData] = useState(false)   // ✅ FIXED here

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const localUserProfileData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers: {token}})
      if(data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const value = {
    doctors,getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,setUserData,
    localUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(()=> {
    if(token) {
      localUserProfileData()
    } else {
      setUserData(false)
    }
  },[token])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
