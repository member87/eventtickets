import React, { useEffect } from "react";
import { Ticket } from "@prisma/client";

type Props = {
  ticket: Ticket,
}
type State = {
  price: string,
}

export class SigleTicket extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const price = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'GBP' 
      }).format(this.props.ticket.price/100);

    this.state = {
      price: price
    };
  }  

  render() {
    return (
      <div className="bg-white shadow m-2 rounded overflow-hidden group flex">
        <div className="flex-auto p-3">
          <div className="">Seat <span className="font-semibold">{this.props.ticket.seat}</span></div>
          <div className="">Full Price Ticket</div>
          <div className="text-blue-800">{this.state.price}</div>
        </div>

        <div className="bg-blue-600 flex justify-center items-center duration-150 ease-in-out translate-x-full group-hover:translate-x-0">
          <i className="fa-solid fa-chevron-right text-white px-3"></i>
        </div>
      </div>

    );
  }
}