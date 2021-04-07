import React from 'react'

const AddDrawingForm = ({ form, handleFormChange }) => (
  <>
    <label htmlFor="title">Title</label>
    <input 
      name="title"
      value={form.title}
      onChange={handleFormChange}
      className="form-control"
      type="text"
    />
    <label htmlFor="body">Description</label>
    <textarea 
      name="body"
      value={form.body}
      onChange={handleFormChange}
      className="form-control"
    />
  </>
)

export default AddDrawingForm