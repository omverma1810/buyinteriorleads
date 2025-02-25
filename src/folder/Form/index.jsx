function FormEventsExample() {
    const handleChange = (event) => {
      console.log("Input changed:", event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault(); 
      console.log("Form submitted");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Enter text" />
        <button type="submit">Submit</button>
      </form>
    );
  }
  