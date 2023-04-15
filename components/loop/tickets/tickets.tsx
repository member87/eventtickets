import React, { useEffect } from "react";
import { SigleTicket } from "./single_ticket";
import { Ticket } from "@prisma/client";

type Props = {
  eventId: number,
}
type State = {
  page: number,
  tickets: Ticket[],
}

export class Tickets extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
      tickets: []
    };
  }

  componentDidMount(): void {
    fetch('/api/v1/tickets/get?event=' + this.props.eventId)
      .then(res => res.json())
      .then(data => {
        this.setState({
          tickets: data.tickets
        });
      });
  }

  loadNextPage(): void {

    fetch('/api/v1/tickets/get?event=' + this.props.eventId + '&page=' + (this.state.page + 1))
      .then(res => res.json())
      .then(data => {
        this.setState({
          tickets: data.tickets
        });
      });
  }

  
  render() {
    return (
      <div className="">
        {this.state && this.state.tickets.map((ticket) => {
          return (
            <SigleTicket ticket={ticket} key={ticket.id} />
          );
        })
        }
      </div>

    );
  }
}