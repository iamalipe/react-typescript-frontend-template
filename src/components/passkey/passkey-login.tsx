import api from "@/api/api";
import { currentUserQueryKey } from "@/hooks/api-query/auth-query";
import { queryClient } from "@/hooks/use-api-query";
import { SearchParams } from "@/routes/auth/login/login";
import { startAuthentication } from "@simplewebauthn/browser";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "../ui";

const PasskeyLogin = () => {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/_auth/login" }) as SearchParams;

  async function registerPasskey() {
    const opts = await api.auth.passKeyLogin();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = opts?.data as any;
    const attResp = await startAuthentication(options);
    const res = await api.auth.passKeyLoginVerify({ attResp });
    if (res?.success) {
      // await apiQuery.auth.getCurrentUser();
      queryClient.invalidateQueries({ queryKey: currentUserQueryKey });
      // If there's a redirect URL, navigate to it, otherwise go to the home page
      if (redirect) {
        // Handle external URLs or relative paths
        if (redirect.startsWith("http")) {
          window.location.href = redirect;
        } else {
          // For internal app routes
          navigate({ to: redirect });
        }
      } else {
        navigate({ to: "/" });
      }
    }
  }

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        registerPasskey();
      }}
      variant="outline"
      className="w-full"
    >
      Continue Passkey
    </Button>
  );
};

export default PasskeyLogin;
