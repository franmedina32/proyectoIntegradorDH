import { useContext } from "react";
import { NotificationContext } from "../../context/Notification.context";
import MensajeAlerta from "../MensajeAlerta/MensajeAlerta";

const NotificationContainer = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div>
      {notifications.map(({ id, texto, tipo }) => (
        <MensajeAlerta
          key={id}
          open={!!texto}
          onClose={() => removeNotification(id)}
          severity={tipo}
          mensaje={texto}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
