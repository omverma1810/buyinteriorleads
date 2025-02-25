function DragDropExample() {
    const handleDragStart = (event) => {
      console.log("Drag started");
    };
  
    const handleDragOver = (event) => {
      event.preventDefault(); // Allow dropping
      console.log("Dragging over");
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      console.log("Dropped");
    };
  
    return (
      <div 
        draggable 
        onDragStart={handleDragStart} 
        onDragOver={handleDragOver} 
        onDrop={handleDrop}
      >
        Drag Me!
      </div>
    );
  }
  