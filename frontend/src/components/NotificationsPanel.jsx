import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/notifications/getNotifications`);
        console.log(res.data);
        setNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ position: 'absolute', right: 0, height: '400px', width: '340px', backgroundColor: 'white', top: '100%', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', padding: '14px', boxSizing: 'border-box', boxShadow: '0 2px 4px 0px lightgray', overflow: 'scroll' }}>
      {notifications.map(notification => (
        <div style={{ width: '100%', boxSizing: 'border-box', padding: '6px 10px', backgroundColor: '#eaecf0', borderRadius: '8px', color: 'black', textAlign: 'left' }}>
          <span style={{ fontWeight: 'bold' }}>{ notification.message }</span>
          <div style={{ display: 'flex', gap: '6px', margin: '6px 4px 4px 2px' }}>
            <div style={{ width: '3px', backgroundColor: 'cornflowerblue', borderRadius: '3px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1em', fontWeight: '600' }}>{ notification.task_name }</span>
              <span style={{ fontSize: '.9em' }}>{ notification.description }</span>
            </div>
          </div>
        </div>
      ))}
  </div>
  );
}

export default NotificationsPanel;