import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start() {
        Global.scorenum=0;
        
        this.scheduleOnce(()=>{cc.director.loadScene("Menu");},5);
      }

      onLoad() { 
        cc.director.getPhysicsManager().enabled = true;        	
    }

    // update (dt) {}
}
