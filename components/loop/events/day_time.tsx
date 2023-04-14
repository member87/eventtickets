import React, { useEffect } from "react";
import { EventLocation } from "@/pages/api/v1/events/get";

type Props = {
  event: EventLocation
}
type State = {
  day: string,
  hour: string,
  minute: string
}

const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
export class EventDayTime extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      day: "",
      hour: "",
      minute: ""
    };
  }

  componentDidMount(): void {
    const date = new Date(this.props.event.time);
    const day = weekday[new Date(date).getDay()];

    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    

    this.setState({
      day: day,
      hour: hour,
      minute: minute
    })
  }

  render() {
    return (
      <>
        {this.state.day}  -  {this.state.hour}:{this.state.minute}
      </>
    );
  }
}