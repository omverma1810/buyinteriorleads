function MediaEventsExample() {
    const handlePlay = (event) => {
      console.log("Media started playing");
    };
  
    const handlePause = (event) => {
      console.log("Media paused");
    };
  
    const handleEnded = (event) => {
      console.log("Media ended");
    };
  
    return (
      <video 
        src="video.mp4" 
        controls 
        onPlay={handlePlay} 
        onPause={handlePause} 
        onEnded={handleEnded}
      />
    );
  }
  