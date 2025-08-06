import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface authType {
  user: string;
  accessToken: string;
  loggedIn: boolean;
}

interface AuthContextType {
  auth: authType;
  setAuth: Dispatch<SetStateAction<authType>>;
}

const AuthContext = createContext({} as AuthContextType);

interface Props {
  children: ReactNode;
}

export const emptyAuth : authType = {
  user: '',
  accessToken: '',
  loggedIn: false
}

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState(emptyAuth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;