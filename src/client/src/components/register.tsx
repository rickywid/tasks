import { FunctionComponent, useState } from "react";
import Spinner from "./spinner";
import { RequestClientAuth } from "../helpers/auth/request";
import { IUser } from "../interfaces/IUser";

interface Props {
    toggleShowLogin: (v: boolean) => void;
}

const Register: FunctionComponent<Props> = ({ toggleShowLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [registerError, setRegisterError] = useState<string>("");
    const [registerSuccessMsg, setRegisterSuccessMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const request = new RequestClientAuth();

    const handleNameChange = (e: any) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const body: IUser = {
            username,
            password
        }

        try {
            const res = await request.register(body)
            setRegisterError("");
            setRegisterSuccessMsg("User successfully created. Please login with new account.");
            setIsLoading(false);
        } catch(e) {
            setRegisterError(e.message);
            setRegisterSuccessMsg("");
            setIsLoading(false);
        }
    }

    const cookies = () => {
        return document.cookie.split("XSRF-TOKEN=")[1];
      }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>Register</h4>
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
                    <input type="submit" value="Register" disabled={isLoading} />
                </div>
                {isLoading && <Spinner />}
                {registerError && <small className="form-msg error">{registerError}</small>}
                {registerSuccessMsg && <small className="form-msg success">{registerSuccessMsg}</small>}
                
                <small className="register-login-link">Already have an account? <span onClick={() => toggleShowLogin(true)}>Login</span></small>
            </form>
        </div>
    )
}

export default Register;