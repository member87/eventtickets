import React, { useEffect } from "react";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import {  EventLocation } from "@/api/v1/events/get";
import { SingleEvent } from "./single_event";
import Link from "next/link";

type Props = {}
type State = {
  events: EventLocation[],
  loaded: boolean,
  count: 0
}



export class Events extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      events: [],
      loaded: false,
      count: 0
    };
  }

  componentDidMount(): void {
    fetch('/api/v1/events/get')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          events: data.events,
          loaded: true,
          count: data.count
        })
      });
  }

  render() {
    return (
      <div className="bg-white shadow-xl">
        {this.state.loaded ? (
          <>
            {this.state.events.map((event: EventLocation) => {
              return (
                <SingleEvent event={event} />
              )
            })}

            <Link href="/events">View all {this.state.count} events</Link>
          </>
        ) : (
          <div>Loading...</div>
        )

            }
      </div>
    );
  }
}