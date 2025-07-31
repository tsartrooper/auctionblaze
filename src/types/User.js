


export default class User{
    constructor(data={}){
        this.name = data.userName || "";
        this.email = data.userEmail || "";
        this.picture = data.picture || null;
        console.log("user name:",this.name,
            "user email: ",this.email)
    }
}