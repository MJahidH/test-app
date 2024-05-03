app js main use effect 


  const [fileContents, setFileContents] = useState([]);
  const filePath = FileSystem.documentDirectory + "data11.json";


  useEffect(() => {
    // Check if the file exists
    FileSystem.getInfoAsync(filePath)
      .then((fileInfo) => {
        if (!fileInfo.exists) {
          // File doesn't exist, so create it with initial content
          console.log("File doesn't exist, creating with initial content", "1");
          const initialContent = JSON.stringify([
            {
              message: "clean my room",
              isDone: false,
            },
            {
              message: "clean my window",
              isDone: false,
            },
          ]);
          return FileSystem.writeAsStringAsync(filePath, initialContent).then(
            () => initialContent
          ); // Return initial content for further processing
        } else {
          // File exists, read its content
          console.log("File exists, reading content", "2");
          return FileSystem.readAsStringAsync(filePath); // Return the content for further processing
        }
      })
      .then((content) => {
        // Update state with either the initial content or the read content
        setFileContents(JSON.parse(content));
      })
      .catch((error) => {
        console.error("There was an error in the file operation", error);
      });
  }, []);