import React from 'react';
export default class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChanges(event){
        this.props.onValueChange(event.target.value);
    }
    handleSubmit(event){
        this.props.onSubmit(this.props.value);
        event.preventDefault();
    }
    render(){
        return(
            <nav>
                <form action="#" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.props.value} onChange={this.handleChanges} />
                    <button>Search</button>
                </form>
            </nav>
        );
    }
}