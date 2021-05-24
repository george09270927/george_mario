import { Global } from "./LogIn";


const {ccclass, property} = cc._decorator;

@ccclass
export default class loginCancel extends cc.Component {

    setflag1()
    {
        Global.logincancelFlag=true;
    }
}