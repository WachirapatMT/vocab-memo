import { useEffect } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

import { REDIRECT_CONDITION } from "../constants";

export default function useUser({
  redirectTo = null,
  redirectWhen = REDIRECT_CONDITION.USER_NOT_FOUND,
} = {}) {
  const [token, setCookie, removeCookie] = useCookies([
    process.env.REACT_APP_COOKIE_NAME,
  ]);
  const history = useHistory();

  const { data: user = null, mutate: mutateUser } = useSWR(
    ["http://localhost:3001/user", token],
    async (url, token) => {
      if (!token[process.env.REACT_APP_COOKIE_NAME]) return;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${
              token[process.env.REACT_APP_COOKIE_NAME] || ""
            }`,
          },
        });
        return res?.data ?? null;
      } catch (err) {
        removeCookie(process.env.REACT_APP_COOKIE_NAME, { path: "/" });
        return null;
      }
    },
  );

  useEffect(() => {
    const redirectAsUserFound =
      token[process.env.REACT_APP_COOKIE_NAME] &&
      redirectWhen === REDIRECT_CONDITION.USER_FOUND;
    const redirectAsUserNotFound =
      !token[process.env.REACT_APP_COOKIE_NAME] &&
      redirectWhen === REDIRECT_CONDITION.USER_NOT_FOUND;

    if (redirectTo && (redirectAsUserNotFound || redirectAsUserFound)) {
      history.push(redirectTo);
    }
  }, [user, redirectWhen, redirectTo]);

  return { user, mutateUser };
}
