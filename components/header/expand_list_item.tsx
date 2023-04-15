import React from "react";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
}
type State = {
}

export class ExpandListItem extends React.Component<Props, State> {

  render() {
    return (
      <Link href={this.props.href} className="block px-5 py-3 underline-offset-4 hover:bg-slate-100 hover:text-blue-800 hover:underline">{this.props.label}</Link>
    );
  }
}