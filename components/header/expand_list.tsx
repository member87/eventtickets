import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
}
type State = {
  isMenuOpen: boolean;
}

export class ExpandList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }


  toggleMenu = () => {
    this.setState((state) => ({
      isMenuOpen: !state.isMenuOpen
    }));

  }


  render() {
    return (
      
      <div className="expand-list border-b border-slate-400 cursor-pointer">
        <div className={`px-5 py-3 font-semibold flex items-center hover:bg-slate-100 ${this.state.isMenuOpen && "bg-slate-100"}`} onClick={this.toggleMenu}>
          <span className="flex-auto">{this.props.label}</span>
          <button className="">
            <i className={`fa-solid fa-chevron-${this.state.isMenuOpen ? "up" : "down"} p-3`}></i>
          </button>
        </div>
        <div className={`${!this.state.isMenuOpen && "hidden"}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}