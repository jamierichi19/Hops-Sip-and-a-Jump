import React, { Component } from 'react';

class Email extends Component {

    state = {
        subject: '',
        body: ''
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
        console.log(event.target.value)
      }

    render() {
        return (
            <div>
                <h2>Update Your Fans:</h2>
                <div>
                    <input 
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={this.state.subject}
                        onChange={this.handleInputChangeFor('subject')}

                    />
                </div>
                <div>
                    <textarea
                        type="text"
                        rows="10"
                        cols="50"
                        name="body"
                        placeholder="body"
                        value={this.state.body}
                        onChange={this.handleInputChangeFor('body')}
                    />
                </div>
                <div>
                    <button>Send</button>
                </div>
            </div>
        )
    }
}

export default Email;
