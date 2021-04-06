const AddDrawingForm = ({ form, handleInputChange }) => {
  return (
    <form>
      <label htmlFor="title" className="form-label">
        Email address
      </label>
      <input
        name="title"
        value={form.title}
        onChange={handleInputChange}
        className="form-control" 
        type="text"
      />
      <label htmlFor="title" className="form-label">
        Email address
      </label>
      <textarea
        name="body"
        value={form.body}
        onChange={handleInputChange}
        className="form-control" 
      />
    </form>
  )
}

export default AddDrawingForm