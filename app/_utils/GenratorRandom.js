export const genrateRandomeString = () =>{
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let str = "";
    for(let i = 0; i < 10; i++){
        str += char.charAt(Math.floor(Math.random() * char.length));

    }
    return str;
}