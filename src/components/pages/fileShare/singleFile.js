import React, { Component } from 'react'

export default class SingleFile extends Component {
   constructor(props) {
       super(props)

       this.state = {
           file: {}
       }

       this.handleDownload = this.handleDownload.bind(this)
       this.handleDelete = this.handleDelete.bind(this)
   }

   componentDidMount() {
        fetch(`http://127.0.0.1:5000/file/get/${this.props.id}`, { method: "GET" })
        .then(response => response.blob())
        .then(data => {
        const file = new File([data], this.props.name, { type: this.props.type })
        this.setState({ file: file })
        })
        .catch(error => console.log(error))
   }

   handleDownload() {
    const url = window.URL.createObjectURL(this.state.file)
    const link = document.createElement("a")
    link.download = this.state.file.name
    link.href = url
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }

  handleDelete() {
      fetch(`http://127.0.0.1:5000/file/delete/${this.props.id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => {
          console.log(data)
          if (data === "File Deleted Successfully") {
              this.props.handleDelete(this.props.id)
          }
      })
      .catch(error => console.log(error))
  }

   render() {
       if (this.state.file.name) {
           return (
               <div className='single-file-wrapper'>
                   <h3>{this.state.file.name}</h3>
                   <button onClick={this.handleDownload}>Download</button>
                   <button className="delete-button" onClick={this.handleDelete}>Delete</button>
               </div>
           )
       }
       else {
            return (
                <div className='single-file-wrapper'>
                    <h3>Loading...</h3>
                </div>
            )
       }
   }
}