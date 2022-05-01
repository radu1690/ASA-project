/** 
  * Task description: Write a method that turns a deep array into a plain array 
  * Expected Result: [1, 2, [3, 4, [5]]] => [1, 2, 3, 4, 5] 
  * Task complexity: 3 of 5 
  * @param {Array} array - A deep array 
  * @returns {Array} 
*/
const flatten = (array) => {
    let result = [];
    array.forEach(element => {
        if(!Array.isArray(element)){
            result = result.concat(element);
        }else{
            result = result.concat(flatten(element));
        }
    });
    return result;
   }
const data = [1, 2, [3, 4, [5]]];
console.log(flatten(data)); // [1, 2, 3, 4, 5]