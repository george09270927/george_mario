
const {ccclass, property} = cc._decorator;

@ccclass
export default class loginEnter extends cc.Component {

    enterpress()
    {
        
        cc.log(this.node.parent.getChildByName("EmailBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string);
       
        cc.log(this.node.parent.getChildByName("PasswordBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string);

        
        var email = this.node.parent.getChildByName("EmailBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
        var password = this.node.parent.getChildByName("PasswordBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
        
            console.log(email);
            console.log(password);
            
            firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
                //========================================
                function showNotification(){
                    new Notification("Success!", {
                        body: "your email:  "+email,
                        icon: 'https://i.imgur.com/aqsW5I6.jpg'
                    });
                }
                if(Notification.permission === "granted"){
                    showNotification(); 
                }else if(Notification.permission !== "denied"){
                    Notification.requestPermission().then(permission=> {
                        if(permission==="granted"){
                            showNotification();
                        }
                    });
                }
                //================================================
                alert("email account login success!");
                cc.director.loadScene("Menu");
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                //========================================
                function showNotification(){
                    new Notification("Something wrong!", {
                        body: errorMessage,
                        icon: 'https://i.imgur.com/Jcekgi1.jpg'
                    });
                }
                if(Notification.permission === "granted"){
                    showNotification(); 
                }else if(Notification.permission !== "denied"){
                    Notification.requestPermission().then(permission=> {
                        if(permission==="granted"){
                            showNotification();
                        }
                    });
                }
                //================================================
            });
            
        
        
    
}
