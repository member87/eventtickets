import React from "react";

type Props = {}

export class Header extends React.Component<Props> {
  render() {
    return (
      <header>
        <div className="bg-blue-700 text-white py-7 px-10 text-xl">
          Event Tickets
        </div>
      </header>
    );
  }
}