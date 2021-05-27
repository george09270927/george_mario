import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start() {
        this.scheduleOnce(()=>{cc.director.loadScene("Menu");},4);
    }

      onLoad() { 
        Global.scorenum=0;
        Global.lifenum=5;
        Global.coinnum=0;
        cc.director.getPhysicsManager().enabled = true;       	
    }

    // update (dt) {}
}
