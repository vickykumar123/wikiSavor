import {useCreateUser} from "@/graphql/queries/currentUser";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const {user} = useAuth0();
  const {createUser} = useCreateUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && user?.name && !hasCreatedUser.current) {
      createUser({auth0Id: user.sub, email: user.email, name: user.name});
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [user, createUser, navigate]);
  return <>Loading...</>;
}
