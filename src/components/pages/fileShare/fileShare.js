import React, { Component } from 'react';

import SingleFile from "./singleFile"

export default class FileShare extends Component {
  constructor() {
    super()

    this.state = {
      file: {},
      data: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleGetData = this.handleGetData.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(event) {
    this.setState({ file: event.target.files[0] })
  }

  handleSubmit() {
    const form = new FormData()
    form.append("name", this.state.file.name)
    form.append("type", this.state.file.type)
    form.append("data", this.state.file)

    fetch("http://127.0.0.1:5000/file/add", {
      method: "POST",
      body: form
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  handleGetData() {
    fetch("http://127.0.0.1:5000/file/get/data", { method: "GET" })
    .then(response => response.json())
    .then(data => this.setState({ data: data }))
    .catch(error => console.log(error))
  }

  renderFiles() {
    const fileContainer = []

    this.state.data.forEach(fileData => {
      fileContainer.push(
        <SingleFile 
          key={fileData.id}
          id={fileData.id} 
          name={fileData.name} 
          type={fileData.file_type} 
          handleDelete={this.handleDelete}
        />
      )
    })

    return fileContainer
  }

  handleDelete(id) {
    const newData = this.state.data.filter(fileData => fileData.id !== id)
    this.setState({ data: newData })
  }

  render() {
    return (
      <div className='file-share-wrapper'>
        <input onChange={this.handleChange} type="file"/>
        <button onClick={this.handleSubmit}>Send</button>
        <hr/>
        <button onClick={this.handleGetData}>Get Files</button>
        <div className="files-wrapper">
          {this.renderFiles()}
        </div>
      </div>
    );
  }
}