import React from "react";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
}
type State = {
}

export class HeaderListItem extends React.Component<Props, State> {

  render() {
    return (
      <Link href={this.props.href} className="block px-5 py-5 font-bold border-b border-slate-400  hover:bg-slate-100">{this.props.label}</Link>
    );
  }
}