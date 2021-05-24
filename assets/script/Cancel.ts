import { Global } from "./SignUp";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Cancel extends cc.Component {

    setflag1()
    {
        Global.cancelFlag=true;
    }
}
