
import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start() {

        if(Global.middleflagOn==false)
        {
          Global.scorenum=0;
          Global.coinnum=0; 
        }
        if(Global.nowlevel==1) this.scheduleOnce(()=>{cc.director.loadScene("level1");},1.7);
        else if(Global.nowlevel==2) this.scheduleOnce(()=>{cc.director.loadScene("level2");},1.7);
        
    }

      onLoad() { 
        cc.director.getPhysicsManager().enabled = true;        	
    }

    // update (dt) {}
}
