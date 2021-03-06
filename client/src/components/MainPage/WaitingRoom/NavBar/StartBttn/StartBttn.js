import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Cookies from 'universal-cookie'


const cookies = new Cookies()
const serverUrl = 'https://werewolf01.herokuapp.com/'



class StartBttn extends Component{

    state = {
        ifAdmin: false,
        admin: "",
        numberOfPlayers: 0,
    }

    

    componentDidMount(){
        const socket = socketIOClient(serverUrl + 'get-admin', {
            query: {
                roomid: this.props.roomid,
                username: this.props.username
            }
        })

        socket.on('GetAdmin', data => {
            this.setState({
                admin: data.admin,
                numberOfPlayers: data.numberOfPlayers
            })

            if(this.props.username == data.admin){
                this.setState({
                    ifAdmin: true
                })
            }
            else{
                this.setState({
                    ifAdmin: false
                })
            }
        })
    }

    render(){
        return(
            <>
                {this.state.ifAdmin ? 
                    <>
                    <b>You are the admin</b>
                    <br></br>
                    <br></br>
                    <button type='button' >Start the game</button>
                    </>
                    :

                    null
                    
                }
                <p>Number of Players: {this.state.numberOfPlayers}</p>
                <p>Admin is: {this.state.admin}</p>
            </>
        )
    }
}

export default StartBttn