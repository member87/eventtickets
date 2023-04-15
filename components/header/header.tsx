import React from "react";
import { ExpandList } from "./expand_list";
import { Genre } from "@prisma/client";
import { ExpandListItem } from "./expand_list_item";

type Props = {}
type State = {
  isMenuOpen: boolean;
  genres: Genre[];
}



export class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      genres: []
    };

  }


  toggleMenu = () => {
    this.setState((state) => ({
      isMenuOpen: !state.isMenuOpen
    }));

  }

  componentDidMount(): void {
    fetch("/api/v1/genres/get")
      .then(res => res.json())
      .then(data => {
        this.setState({
          genres: data
        })
      }
    );

  }


  render() {
    return (
      <header className="relative">
        <div className={`absolute top-0 left-0 w-screen h-screen z-50 ease-in-out duration-150 ${this.state.isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="absolute h-full w-full bg-black opacity-50 d-none"></div>
          <div className="absolute w-full h-full bg-white shadow-lg">
            <div className="py-3 px-5 border-b border-slate-400 flex items-center">
              <button className="absolute" onClick={this.toggleMenu}>
                <i className="fa-solid fa-chevron-left p-3"></i>
              </button>
              <h2 className="mx-auto text-center font-semibold text-lg">Menu</h2>
            </div>


            <div className="p-3">
              <ExpandList label="Music">
                {this.state.genres && this.state.genres.map((genre) => {
                  return (
                    <ExpandListItem label={genre.genre} href={`/genres/${genre.id}`}/>
                  )
                })}
              </ExpandList>
              </div>
          </div>
        </div>
        <div className="bg-blue-700 text-white py-3 px-5 text-xl">
          <button className="" onClick={this.toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <span>Event Tickets</span>
        </div>
      </header>
    );
  }
}