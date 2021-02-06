import { useContext } from "react"
import { DesktopNotificationsCtx } from "../../contexts/DesktopNotificationsCtx";

const useDesktopNotifications = () => {
  return useContext( DesktopNotificationsCtx )
}

export default useDesktopNotifications;