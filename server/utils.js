const File_name = "../db/users.json";
const fs =require('fs')
function getUsers(){
    try {
        const data = fs.readFileSync(File_name);
        console.log(File_name);
        return JSON.parse(data);
      } catch (error) {
        return [];
      } 
}
function addUsers(users) {
    const data = JSON.stringify(users);
    fs.writeFileSync(File_name, data);
  };
module.exports= {getUsers,addUsers};