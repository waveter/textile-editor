import React from "react";
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import TextileEditor from "./TextileEditor";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="main-body">
        <Header />
        <TextileEditor />
        <Footer />
      </div>
    );
  }
}

export default App;
