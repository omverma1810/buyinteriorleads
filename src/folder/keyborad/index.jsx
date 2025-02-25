// function KeyboardEventsExample() {
//     const handleKeyDown = (event) => {
//       console.log("Key down:", event.key);
//     };
  
//     const handleKeyUp = (event) => {
//       console.log("Key up:", event.key);
//     };
  
//     return (
//       <input 
//         onKeyDown={handleKeyDown} 
//         onKeyUp={handleKeyUp} 
//         placeholder="Type something..."
//       />
//     );
//   }

  import React from 'react'

  function Keyboard () {
    const handleKeyDown = (event) => {
      console.log("Key down:", event.key);
    };
  
    const handleKeyUp = (event) => {
      console.log("Key up:", event.key);
    };
  
    return (
      <input 
        onKeyDown={handleKeyDown} 
        onKeyUp={handleKeyUp} 
        placeholder="Type something..."
      />
    );

  }

  export default Keyboard


//   function KeyboardEventsExample({ placeholderText }) {
//     const handleKeyDown = (event, item) => {
//       console.log(`Key down: ${event.key}, Context: ${item}`);
//     };
  
//     return (
//       <input
//         placeholder={placeholderText}
//         onKeyDown={(e) => handleKeyDown(e, "Input Field")}
//       />
//     );
//   }
  
  