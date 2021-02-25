import { useContext } from "react";
import { SettingsCtx } from "../../contexts/SettingsCtx";

const useSettings = () => {
  return useContext( SettingsCtx );
}
export default useSettings