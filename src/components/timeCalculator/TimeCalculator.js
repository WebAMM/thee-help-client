import React, { useEffect } from "react";
import moment from "moment";

function TimeCalculator({ startTime, endTime }) {
  // start time and end time
  const StartTime = moment(startTime, "HH:mm:ss a");
  const EndTime = moment(endTime, "HH:mm:ss a");

  // calculate total duration
  const duration = moment.duration(EndTime.diff(StartTime));

  // duration in hours
  const hours = parseInt(duration.asHours());

  // duration in minutes
  const minutes = parseInt(duration.asMinutes()) % 60;

  return (
    <div>
      <strong>Total time:</strong> {hours} hours && {minutes} minutes
    </div>
  );
}

export default TimeCalculator;
