import { Global } from "./SignUp";

const {ccclass, property} = cc._decorator;




@ccclass
export default class LogIn extends cc.Component {

    @property(cc.Prefab)
    private loginBoxPrefab: cc.Prefab = null;

    private createLogInBox() {
        if(Global.logincancelFlag==false&&Global.isSignup==false)
        {
            cc.log("create longinbox");
            let loginBox = cc. instantiate(this.loginBoxPrefab);
            loginBox.getComponent('loginBox').init(this.node);
            Global.isLogin=true;
        }
    }
}

