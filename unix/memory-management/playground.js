let obj = {name : "kofi"}
let num = 700

function modify(object, number ){
    object.name = "Dylan"
    number = 1000
}

console.log(obj)
console.log(num)
modify(obj, num)
console.log("new obj value", obj)
console.log("new num value", num)
