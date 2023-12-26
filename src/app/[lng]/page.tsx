"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuth} from "firebase/auth";
import firebaseApp from "@/utils/firebase/config";
import { useAppDispatch } from "@/redux-toolkit/hooks";
import { clearUser, setUser } from "@/redux-toolkit/reducers/user";
const auth = getAuth(firebaseApp);

const Home = () => {
const dispatch = useAppDispatch()
  useEffect(()=>{
    try {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log("user.....from......Home");
          console.log(user);
          
          
          const userPayload = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          };
          dispatch(setUser(userPayload));
     
        } else {
            dispatch(clearUser())
        }
      });
    } catch (error) {
      
    }
    
  },[])

  const router = useRouter();
  useEffect(() => {
    router.push("/home/mix-demo/classic");
  }, []);

  return <></>;
};

export default Home;
