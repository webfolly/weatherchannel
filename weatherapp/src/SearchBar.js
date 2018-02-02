import React from 'react';

export default function SearchBar(props) {
        return(
            <div className="search-bar">
                <form action="#" onSubmit = { 
                        (e) => { props.onSubmit(props.value);e.preventDefault();}
                    }>
                    <input type="text" name="searchBar" value={props.value} onChange={
                        (e) => props.onChange(e.target.name,e.target.value)   
                    } />
                    <button>Search</button>
                </form>
            </div>
        );
}