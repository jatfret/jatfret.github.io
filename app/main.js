var React = require('react');
var ReactDOM = require('react-dom');

class TestComponent extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      arr: [23, 324, "tom"]
    };
 }

  render() {
    var {arr} = this.state;

    return (<div>
      {arr.map(function(value, index){
        return (<p>{value} - {index}</p>)                               
      }}    
    </div>)
  }

} 

ReactDOM.render(<TestComponent/>, document.getElementById("container"));
