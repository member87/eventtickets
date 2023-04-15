import React from "react";

type Props = {}
type State = {
}



export class Spinner extends React.Component<Props, State> {
  
  render() {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-b-blue-600 border-gray-300"></div>
      </div>
    );
  }
}