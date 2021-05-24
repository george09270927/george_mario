import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start() {
        Global.scorenum=0; 
        if(Global.nowlevel==1) this.scheduleOnce(()=>{cc.director.loadScene("level1");},2.5);
        else if(Global.nowlevel==2) this.scheduleOnce(()=>{cc.director.loadScene("level2");},2.5);
    
      }

      onLoad() { 
        cc.director.getPhysicsManager().enabled = true;        	
    }

    // update (dt) {}
}
