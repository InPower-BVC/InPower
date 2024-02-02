class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes("javascript")) {
      this.actionProvider.handleJavascriptList();
    } else if (lowerCaseMessage.includes("help")) {
      this.actionProvider.displayLearningOptions();
    } else if (lowerCaseMessage.includes("options")) {
      this.actionProvider.displayLearningOptions();
    } else if (lowerCaseMessage.includes("yes")) {
      this.actionProvider.handleYesResponse(); 
    } else if (lowerCaseMessage.includes("no")) {
      this.actionProvider.handleNoResponse(); 
    }
    
    else {
      // Default behavior when no recognized command is found
      this.actionProvider.displayDefaultResponse();
    }
  }
}

export default MessageParser;
