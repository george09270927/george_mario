import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    gotogamestart () {
        if(Global.ioFlag==false)
        {
            Global.nowlevel=2;
            cc.director.loadScene("gamestart");
        }
    }
}
