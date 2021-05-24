import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    gotogamestart () {
        Global.nowlevel=2;
        cc.director.loadScene("gamestart");
    }
}
