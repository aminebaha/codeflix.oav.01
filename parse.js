const fs = require('fs')

const path = require('path')

module.exports = {

parseENV:   (file)=> { //NE PREND PAS EN COMPTE LES , DANS LES CHAINES

if(file==null || file==undefined) 
        return console.error("file null")
        
const content = fs.readFileSync(file,'utf8',(err)=>{
        if(err)
            console.error("Error read file")
    })

const regex = /[^#\s]*[A-za-z0-9]/gm 
let data = content.match(regex).toString()

let result =""

result += "{ " + data.replace(/=/gm,"\":\"")+ " }";
let res =""
for(let i=0;i<result.length;i++) {
    if(result[i]=== ",") {
        res += "\" " +result[i] + "\" "
    }
    else {
        res += result[i]
    }
}

let pathENV = path.basename(file+"v2.json")
fs.writeFileSync(pathENV,res,(err)=> {
    if(err) 
        console.error("Error write file")
})

},


parseINI:   (file) => {

    if(file==null || file==undefined) 
        return console.error("file null")

    const content = fs.readFileSync(file,'utf8',(err)=>{
        if(err)
            console.error("Error read file")
    })

    let regexKey = /^\[[A-Za-z0-9]*\]/gm
    let regexValue = /^[A-Za-z0-9\d]*[^;\n\[]*/gm
    
    let keys = content.toString().match(regexKey).toString()
    let values = content.toString().match(regexValue)
    let res =[]
    for(let i=0;i<values.length;i++) {
        if(values[i]!="" ) {
            res [i]= values[i]
        }
    }
    
    let filtered = res.filter(function (el) {
        return true;
      });
    let count =0
  
    let result = "{ "
    for(let i=0;i<keys.length;i++) {
            
       if(keys[i]=="[") {
        result += "\""
       }
       else if(keys[i]=="]") {
        result +="\:"+"{\""+filtered[count]+"\"}"
        count++
       }
       else if(keys[i]==":") {
        result += "\""
       }
       else {
        result += keys[i]
       }
              
    }
    result += "}"
    
    
    fs.writeFileSync(file+"v2.json",result,(err)=> {
        if(err) 
            console.error("Error write file")
    })

return "File '"+ file+"v2.json' has been successfully created"
}


}