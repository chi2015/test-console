document.addEventListener("DOMContentLoaded", () => {
    Logger();
    setInterval(() => {
        console.log("test "+ Math.floor(Math.random()*5), "test 2", "test 3");
    }, 500);

    setInterval(() => {
        console.error("err test "+ Math.floor(Math.random()*5));
    }, 500);

    let intExample = 3;
    let strExample = 'test1';
    let arrExample = [2, 'test'];
    let objExample = { a: 2, b: 'test', c: [2, 'test']};
    let arrExample2 = [2, 'test', {a : 2, b: 'test'}]; 
    let funcExample = function() {
        return 2;
    }
    console.log(2);
    console.log('test');
    
    console.error(intExample);
    console.error(strExample);
    console.log(arrExample);
    console.log(objExample);
    console.error(intExample, strExample );
    console.log(intExample, strExample, arrExample );
    console.log(intExample, strExample, arrExample2, objExample);

    
    console.log(funcExample);
    console.log(intExample, strExample, arrExample2, objExample, funcExample);
    console.log(console.log);
    console.log(yuituoiruyoi);


});