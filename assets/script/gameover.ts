import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start() {
      var messageListRef = firebase.database().ref(""+Global.email.replace(/\./g,"_"));
      messageListRef.set({
          email: Global.email,
          score: Global.scorenum ,
          coin:  Global.coinnum ,
          life: Global.lifenum ,
          username: Global.username
      }); 
        
        this.scheduleOnce(()=>{cc.director.loadScene("Menu");},5);
      }

      onLoad() { 
        Global.scorenum=0;
        Global.lifenum=5;
        Global.coinnum=0;
        cc.director.getPhysicsManager().enabled = true;       	
    }

    // update (dt) {}
}
