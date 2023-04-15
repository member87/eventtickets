import React, { useEffect } from "react";
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
              <>
                <div className="text-gray-800 flex flex-col items-center mt-6">
                  <span>Loaded {this.state.events.length} out of {this.state.count} events</span>
                  <div className="bg-gray-200 w-full h-1 my-2 max-w-xs rounded-full">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: (this.state.events.length / this.state.count) * 100 + "%" }}></div>
                  </div>
                </div>
                {this.state.events.length < this.state.count && (
                <button onClick={this.loadNextPage} className="px-28 text-lg font-semibold py-2 w-fit block border tracking-wide rounded-full mx-auto mt-6 border-slate-800 hover:bg-zinc-800 hover:text-white duration-150 transition-all">Load More <i className="fa-solid fa-chevron-down ml-1 text-sm"></i></button>
                )}
              </>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}