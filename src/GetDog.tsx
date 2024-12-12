export const GetDog = (name: String) => {
    let asciiVal = 0
    for (let i = 0; i < name.length; i++) {
        asciiVal += name.charCodeAt(i)
    }

    const specialNum = Math.floor(Math.random() * 10) + 2
    asciiVal += specialNum

    let modNum = asciiVal % 12
    
  return modNum
}

