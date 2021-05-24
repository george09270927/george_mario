import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class signupEnter extends cc.Component {

    enterpress()
    {
        
        cc.log(this.node.parent.getChildByName("EmailBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string);
        cc.log(this.node.parent.getChildByName("UserNameBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string);
        cc.log(this.node.parent.getChildByName("PasswordBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string);

        
        var email = this.node.parent.getChildByName("EmailBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
        var username = this.node.parent.getChildByName("UserNameBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
        var password = this.node.parent.getChildByName("PasswordBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
        console.log(email);
        console.log(password);
        
        if(this.hasSpecialStr(username)==true)
        {
            

            function showNotification(){
                new Notification("Something wrong!", {
                    body: "username is not valid!",
                    icon: 'https://i.imgur.com/Jcekgi1.jpg'
                });
            }
            showNotification(); 
            alert("please only use uppercase and number as your username!");
        }
        else 
        {

        
            firebase.auth().createUserWithEmailAndPassword(email,password).then(() => {
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
                

                
                
            var messageListRef = firebase.database().ref(""+email.replace(/\./g,"_"));
        
            messageListRef.set({
                email: email,
                score: 0 ,
                coin: 0 ,
                life: 5 ,
                username: username
            });
            Global.email = email;

            cc.audioEngine.stopMusic();

            //alert("New account register success! It will sign in automatically.");
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
    }       
    hasSpecialStr(str){
        var specialChars= "abcdefghijklmnopqrstuvwxyz~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。";
        var len=specialChars.length;
        for ( var i = 0; i < len; i++){
            if (str.indexOf(specialChars.substring(i,i+1)) != -1){
                return true;
            }
        }
        return false;
    }
    
}