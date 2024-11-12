import React , {createContext , useEffect , useState , useContext} from 'react';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';

const UserContext = React.createContext();

export const UserContextProvider = ({children}) => {

    const serverUrl = "http://localhost:8000"

    const router = useRouter();

    const [user , setUser] = useState(null);
    const [userState , setUserState] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading , setLoading] = useState(true);

    // register user
    const registerUser = async (e) => {
        e.prventDefault();
        if(!userState.email || !userState.password) {
            toast.error("Please enter a valid email and password");
            return;
        }
    };

    return (
        <UserContext.Provider value={"Hello from Context "}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => {
    return useContext(UserContext);
};
