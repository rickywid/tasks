import { FunctionComponent, useContext, useState } from "react";
import Spinner from "./spinner";
import { UserContext } from "../context/userContext";
import { RequestClientAuth } from "../helpers/auth/request";

interface Props {
    toggleShowLogin: (v: boolean) => void;
}
const Login: FunctionComponent<Props> = ({ toggleShowLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    //@ts-ignore
    const { user, setUser } = useContext(UserContext);
    const requestAuth = new RequestClientAuth();

    const handleNameChange = (e: any) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await requestAuth.login(username, password);
            console.log(res)
            if (res !== "false") {
                setUser({ authenticated: res });
                setIsLoading(false);
            }
        } catch (e) {
            setLoginError(e.message);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>Login</h4>
                    <div>
                        <label htmlFor="name"><strong>Name</strong></label>
                    </div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => handleNameChange(e)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password"><strong>Password</strong></label>
                </div>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => handlePasswordChange(e)}
                    required
                />
                <div>
                    <input type="submit" value="Login" disabled={isLoading} />
                    {isLoading && <Spinner />}
                </div>
                {loginError && <small className="form-msg error">{loginError}</small>}
                <small className="register-login-link">Don't have an account? <span onClick={() => toggleShowLogin(false)}>Register</span></small>
            </form>
        </div>
    )
}

export default Login;