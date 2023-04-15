import React, { useEffect } from "react";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import {  EventLocation } from "@/api/v1/events/get";
import { SingleEvent } from "./single_event";
import Link from "next/link";

type Props = {
  limitList?: boolean
}
type State = {
  events: EventLocation[],
  loaded: boolean,
  count: number,
  page: number,
}



export class Events extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      events: [],
      loaded: false,
      count: 0,
      page: 0,
    };


    this.loadNextPage = this.loadNextPage.bind(this);
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

  loadNextPage(): void {
    fetch('/api/v1/events/get?page=' + (this.state.page + 1))
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState((state) => ({
          events: state.events.concat(data.events),
          page: state.page + 1
        }))
      });
  }

  render() {
    return (
      <div className="bg-white shadow-xl pb-5">
        {this.state.loaded ? (
          <>
            {this.state.events.map((event: EventLocation) => {
              return (
                <SingleEvent event={event} />
              )
            })}
            {this.props.limitList ? (
              <Link href="/events" className="px-10 py-2 w-fit block border uppercase tracking-wide rounded-full mx-auto mt-6 border-slate-700">View all {this.state.count} events</Link>
            ) : (
              <button onClick={this.loadNextPage} className="px-10 py-2 w-fit block border tracking-wide rounded-full mx-auto mt-6 border-slate-700">Load More</button>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )

            }
      </div>
    );
  }
}