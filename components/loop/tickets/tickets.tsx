import React, { useEffect, useRef } from "react";
import { SigleTicket } from "./single_ticket";
import { Ticket } from "@prisma/client";
import { Spinner } from "@/components/global/spinner";

type Props = {
  eventId: number,
}
type State = {
  page: number,
  tickets: Ticket[],
  loadingMore: boolean,
  maxTickets: number,
}

export class Tickets extends React.Component<Props, State> {
  private scrollRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: Props) {
    super(props);
    
    this.state = {
      page: 0,
      tickets: [],
      loadingMore: true,
      maxTickets: 0,
    };
    
    this.loadMore = this.loadMore.bind(this);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.loadMore);
  }
  
  loadMore(){
    if(!this.scrollRef.current) return;
    
    /* 
     * Get last elemnt inside react ref 
     * If the last element is visible, load more
     */
    const lastElement = this.scrollRef.current.lastElementChild;
    if(!lastElement) return;
    const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    if(pageOffset > lastElementOffset){
      this.loadNextPage();
    }
    
  }

  componentDidMount(): void {
    if (typeof window === "undefined") return;
    window.addEventListener('scroll', this.loadMore);
    fetch('/api/v1/tickets/get?event=' + this.props.eventId)
      .then(res => res.json())
      .then(data => {
        this.setState({
          tickets: data.tickets,
          loadingMore: false,
          maxTickets: data.count
        });
      });
  }

  loadNextPage(): void {
    if(this.state.loadingMore) return;
    if(this.state.tickets.length >= this.state.maxTickets) return;
    this.setState({
      loadingMore: true
    });
    fetch('/api/v1/tickets/get?event=' + this.props.eventId + '&page=' + (this.state.page + 1))
      .then(res => res.json())
      .then(data => {
        this.setState((state) => ({
          tickets: state.tickets.concat(data.tickets),
          page: state.page + 1,
          loadingMore: false
        }));
      });
  }


  render() {
    return (
      <div className="" ref={this.scrollRef} >
        {this.state && this.state.tickets.map((ticket) => {
          return (
            <SigleTicket ticket={ticket} key={ticket.id} />
          );
        })
        }
        {this.state && this.state.loadingMore && (
          <div className="m-2 rounded py-4">
            <Spinner />
          </div>
        )}
      </div>
    );
    
  }
}