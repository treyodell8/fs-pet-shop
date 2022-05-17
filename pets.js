var arr = process.argv
var keyWord = arr[2];
// var keyWord = arr[2];
var fs = require('fs');
var petsArr = require('./pets.json');



    if (keyWord === "read") {
        var num = arr[3];
        if (!num) {
        console.log(petsArr);
        } else if (num >= petsArr.length || num < 0) {
            console.log("Usage: node pets.js read INDEX");
        } else {
            console.log(petsArr[num])
        }
    } else if (keyWord === "create") {
        let age = parseInt(arr[3]);
        let kind = arr[4];
        let name = arr[5];
        if (age !== undefined && kind !== undefined && name !== undefined) {
            var petObj = {
                age: age,
                kind: kind,
                name: name
                };

            petsArr.push(petObj);
            fs.writeFile('pets.json', JSON.stringify(petsArr), function(error) {
                if(error) {
                    console.log('something is wrong');
                } else {
                    console.log(petsArr);
                }
            })
        }
        
    } else {
        console.error(new Error("Usage: node pets.js create AGE KIND NAME"))
}