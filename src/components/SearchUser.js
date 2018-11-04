import React, { Component } from 'react';

class SearchUser extends Component {
    render() {
        return (
            <div id="search">
                <input type="text" placeholder="Search contacts..." />
            </div>
        );
    }
}

export default SearchUser;