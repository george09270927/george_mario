import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start() {
        this.scheduleOnce(()=>{cc.director.loadScene("Menu");},4);
    }

      onLoad() { 
        var messageListRef = firebase.database().ref(""+Global.email.replace(/\./g,"_"));
            messageListRef.set({
                email: Global.email,
                score: Global.scorenum ,
                coin:  Global.coinnum,
                life: 5,
                username: Global.username
            });
        cc.director.getPhysicsManager().enabled = true;       	
    }

    // update (dt) {}
}
