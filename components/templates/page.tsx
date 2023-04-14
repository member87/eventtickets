import React from "react";
import { Header } from "@/components/header/header";

type Props = {}

export class Page extends React.Component<Props> {
  render() {
    return (
      <>
        <Header />
        <main>
          {this.props.children}
        </main>
      </>
    );
  }
}