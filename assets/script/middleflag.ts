import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class middleflag extends cc.Component {

    start () {
        
    }

    update(){
        if(Global.middleflagOn==true)
        {
            this.node.x = Global.globalX+14;
            this.node.scaleX = -1;
        }
    }
}

