import { useEffect } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

import { config } from "../config";
import { REDIRECT_CONDITION } from "../constants";

export default function useUser({
  redirectTo = null,
  redirectWhen = REDIRECT_CONDITION.USER_NOT_FOUND,
} = {}) {
  const [token, setCookie, removeCookie] = useCookies([config.cookieName]);
  const history = useHistory();

  const { data: user = null, mutate: mutateUser } = useSWR(
    [`${config.apiHost}/user`, token],
    async (url, token) => {
      if (!token[config.cookieName]) return;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token[config.cookieName] || ""}`,
          },
        });
        return res?.data ?? null;
      } catch (err) {
        removeCookie(config.cookieName, { path: "/" });
        return null;
      }
    },
  );

  useEffect(() => {
    const redirectAsUserFound =
      token[config.cookieName] &&
      redirectWhen === REDIRECT_CONDITION.USER_FOUND;
    const redirectAsUserNotFound =
      !token[config.cookieName] &&
      redirectWhen === REDIRECT_CONDITION.USER_NOT_FOUND;

    if (redirectTo && (redirectAsUserNotFound || redirectAsUserFound)) {
      history.push(redirectTo);
    }
  }, [user, redirectWhen, redirectTo]);

  return { user, mutateUser };
}
