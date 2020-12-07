const path = require("path");
const fs = require("fs");
const { json } = require("express");
const pathusersJSON = path.resolve(__dirname + '/../database/users.json');

const allFunctions ={
    getAllUsers: ()=>{
        const users = fs.readFileSync(pathusersJSON, "utf-8")
        const usersParse = JSON.parse(users);
        return usersParse
    },
    writeUsers: (userToWrite)=>{
        const users = allFunctions.getAllUsers();
        const newUser = [...users,userToWrite];
        const NewUserString = JSON.stringify(newUser,null,2);
        fs.writeFileSync(pathusersJSON, NewUserString);
    },
    newUserId: ()=>{
        const users = allFunctions.getAllUsers();
        if(users == ""){
            return 1;
        }
        return users.pop().id +1;
    }
}

module.exports=allFunctions