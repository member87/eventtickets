import React, { useEffect } from "react";
import { EventLocation } from "@/pages/api/v1/events/get";
import { dateToDay } from "@/util/time";

type Props = {
  event: EventLocation
}
type State = {
  day: string,
  hour: string,
  minute: string
}

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
    const day = dateToDay(date)

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
        <span className="flex items-center gap-1">
        {this.state.day} <i className="fa-solid fa-circle text-[5px] mx-1 opacity-80 text-gray-700"></i> {this.state.hour}:{this.state.minute}
        </span>
      </>
    );
  }
}