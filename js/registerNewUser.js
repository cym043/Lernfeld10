const fs = require('fs');

function registerNewUser(jsonObject){
    const folderPath = "C:\\Users\\MaxCy\\Programmieren\\Lenrfeld10 - git\\userData";
    
    
    try{
        if (!fs.existsSync(folderPath + "\\" + jsonObject[1])) {
            fs.mkdirSync(folderName);
          }
    } catch (err){
            console.err(err);
    }



    return response;
}

module.exports = {
    registerNewUser
}