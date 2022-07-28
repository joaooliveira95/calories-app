import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { firestoreDB } from "../firebase";

const UserContext = createContext<{
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}>({
  user: null,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  signUp: async (email: string, password: string) => {},
});
interface IUserContextProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IUserContextProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    onAuthStateChanged(auth, async (newUser) => {
      if (newUser) {
        const helper = async () => {
          const q = query(
            collection(firestoreDB, "user"),
            where("uid", "==", newUser.uid)
          );
          const docs = await getDocs(q);
          if (isMounted) setUser({ ...docs.docs[0].data() });
        };
        helper();
      } else {
        if (isMounted) setUser(null);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [auth]);

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const q = query(
        collection(firestoreDB, "user"),
        where("uid", "==", response.user.uid)
      );
      const docs = await getDocs(q);
      setUser({ ...docs.docs[0] });
      navigate("/");
      window?.location?.reload();
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      window?.location?.reload();
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(firestoreDB, "user"), {
        email: email,
        password: password,
        role: "user",
      });
      navigate("/");
      window?.location?.reload();
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
