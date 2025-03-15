function FocusEventsExample() {
    const handleFocus = (event) => {
      console.log("Focused on:", event.target);
    };
  
    const handleBlur = (event) => {
      console.log("Blurred from:", event.target);
    };
  
    return (
      <input 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        placeholder="Focus on me!"
      />
    );
  }
  