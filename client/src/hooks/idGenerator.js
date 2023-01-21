export default function * idGenerator(initial = ""){
    let i = 0;
    while(true){
        i++;
        yield initial + i;  
    }
}