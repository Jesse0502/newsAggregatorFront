export const dialogueBoxText = (text: string) => {
  if(text === "Top Headlines"){
    return "See the top headlines from all news over the world."
  } else if (text === "Recently Viewed Stories"){
    return "Here you'll see stories that you recently saw."
  } else {
    return ""
  } 
}