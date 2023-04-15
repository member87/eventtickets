import React from "react";
import { Header } from "@/components/header/header";
import Head from "next/head";

type Props = {}

export class Page extends React.Component<Props> {
  render() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </Head>
        <Header />
        <main>
          {this.props.children}
        </main>
      </>
    );
  }
}