import React, { useEffect } from "react";
import { EventLocation } from "@/pages/api/v1/events/get";
import { dateToMonth } from "@/util/time";

type Props = {
  event: EventLocation
}
type State = {
  month: string,
  day: string,
}



export class EventDate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      day: "",
      month: ""
    };
  }

  componentDidMount(): void {
    const date = new Date(this.props.event.time);
    const month = dateToMonth(date);
    const day = date.getDate().toString().padStart(2, "0");

    this.setState({
      month: month,
      day: day
    })
  }

  render() {
    return (
      <>
        <div className="text-center inline-block w-14 uppercase">
          <div className="text-xl">
            {this.state.month}
          </div>
          <div className="text-lg">
            {this.state.day}
          </div>
        </div>
      </>
    );
  }
}