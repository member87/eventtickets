import React, { useEffect } from "react";
import { EventLocation } from "@/pages/api/v1/events/get";

type Props = {
  event: EventLocation
}
type State = {
  month: string,
  day: string,
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

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
    const month = months[new Date(date).getMonth()];
    const day = date.getDate().toString().padStart(2, "0");

    this.setState({
      month: month,
      day: day
    })
  }

  render() {
    return (
      <>
        <div className="text-center inline-block w-14">
          <div className="text-2xl">
            {this.state.month}
          </div>
          <div className="text-xl">
            {this.state.day}
          </div>
        </div>
      </>
    );
  }
}