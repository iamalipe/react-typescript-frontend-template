import api from "@/api/api";
import { Button } from "../ui";
// import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { startRegistration } from "@simplewebauthn/browser";

const PasskeyRegister = () => {
  async function registerPasskey() {
    const opts = await api.auth.passKeyRegister();
    console.log("opts", opts?.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = opts?.data as any;
    const attResp = await startRegistration(options);
    const res = await api.auth.passKeyRegisterVerify({ attResp });
    console.log("res", res);
  }

  return <Button onClick={() => registerPasskey()}>Passkey Register</Button>;
};

export default PasskeyRegister;
