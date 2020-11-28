import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

const serverUrl = 'https://werewolf01.herokuapp.com/'

class DisplayPlayerNames extends Component{
    state = {
        renderPlayerNames: null
    }

    componentDidMount(){
        const socket = socketIOClient(serverUrl + 'main-page', {
            query: {
                roomid : this.props.roomid
            }
        } )
        socket.on('GetPlayers', data => {this.setState({renderPlayerNames: data.map(player => {return(<div key = {player}><p>{player}</p></div>)})})})
        
    }

    render(){
        return(
            <>
                {this.state.renderPlayerNames}
            </>
        )
    }
}


export default DisplayPlayerNames