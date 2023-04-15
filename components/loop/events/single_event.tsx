import React, { useEffect } from "react";
import { EventLocation } from "@/pages/api/v1/events/get";
import { EventDayTime } from "./day_time";
import { EventDate } from "./date";
import Link from "next/link";

type Props = {
  event: EventLocation
}
type State = {
  
}


export class SingleEvent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    console.log(this.props.event);
  }

  render() {
    return (
      <Link className="flex gap-4 p-5 border-b-2 border-x-slate-800 items-center" href={"/events/view/" + this.props.event.id}>
        <EventDate event={this.props.event} />
        <div className="flex-auto">
          <EventDayTime event={this.props.event} />
          <div className="font-bold">{this.props.event.name}</div>
          <div>{this.props.event.location.city}  -  {this.props.event.location.venue}</div>
        </div>
        <Link href={"/events/view/" + this.props.event.id} className="shadow w-10 h-10 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-900 duration-75 transition-all"><i className="fa-light fa-chevron-right"></i></Link>
        
      </Link>
    );
  }
}