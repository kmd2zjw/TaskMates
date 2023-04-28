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
    <div style={{ position: 'absolute', right: 0, height: '400px', width: '340px', backgroundColor: 'white', top: '100%', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', padding: '14px', boxSizing: 'border-box' }}>
      <div style={{ height: '50px', width: '100%', boxSizing: 'border-box', padding: '6px 10px', backgroundColor: '#eaecf0', borderRadius: '8px', color: 'black', textAlign: 'left' }}>
          <h5></h5>
      </div>
  </div>
  );
}

export default NotificationsPanel;