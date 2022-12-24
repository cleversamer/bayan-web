// const AuthContext = createContext()

// export function AuthContextProvider({ children }) {
//   const [user, setUser] = useState({})

//   function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password)
//   }
//   function logIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   function logOut() {
//     return signOut(auth)
//   }
//   useEffect(() => {
//     return () => {
//       onAuthStateChanged(auth, (currentUser) => {
//         setUser(currentUser);
//       });
//     };
//   });
//   return (
//     <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function UserAuth() {
//   return useContext(AuthContext);
// }

// import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from './api'
// import { AuthContext } from './App'

// export const LogOut = () => {
//     const navigate = useNavigate()
//     localStorage.removeItem('userData')
//     navigate("/")
// }

// export const SignIn = async (emailOrPhone, password) => {
// const user = useContext(AuthContext)
// const navigate = useNavigate()
// const obj = { emailOrPhone, password }
// try {
//     await api.post('/auth/login', obj)
//         .then(response => {
//             localStorage.setItem('userData', JSON.stringify(response.data.token))
//             user.toggle(JSON.stringify(response.data.user))
//         });
//     navigate('/')
// } catch (error) {
//     console.log("wrong in userName or Password ...");
// }
// }
