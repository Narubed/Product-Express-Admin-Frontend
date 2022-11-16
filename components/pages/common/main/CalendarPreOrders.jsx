import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

export default function CalendarDemo({
  setPreOrders,
  isOldPreOrders,
  isPreOrders,
}) {
  const [dates2, setDates2] = useState(null);

  const onChangeDate = (e) => {
    if (e.value && e.value[1] !== null) {
      const newOrder = isPreOrders.filter(
        (item) =>
          dayjs(
            item.po_timestamp[item.po_timestamp.length - 1].timestamp
          ).format() >= dayjs(e.value[0]).format() &&
          dayjs(
            item.po_timestamp[item.po_timestamp.length - 1].timestamp
          ).format() <= dayjs(e.value[1]).add(1, "day").format()
      );
      setPreOrders(newOrder);
    }
    setDates2(e.value);
  };

  const resetDate = () => {
    setDates2();
    setPreOrders(isOldPreOrders);
  };

  return (
    <div style={{ padding: 20 }}>
      <label>ค้นหาวันที่</label>
      <br />
      <Calendar
        inputStyle={{ fontSize: 16 }}
        id="range"
        value={dates2}
        onChange={onChangeDate}
        selectionMode="range"
        readOnlyInput
      />
      <br />
      {dates2 && (
        <Button
          style={{ marginTop: 10 }}
          label={<a style={{ fontSize: 16 }}>ล้างการค้นหาทั้งหมด</a>}
          className="p-button-secondary"
          onClick={resetDate}
        />
      )}
    </div>
  );
}
