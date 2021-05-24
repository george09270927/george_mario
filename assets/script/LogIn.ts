
const {ccclass, property} = cc._decorator;

export module Global {
    export let loginFlag : boolean = false;
    export let logincancelFlag : boolean = false;
}


@ccclass
export default class LogIn extends cc.Component {

    @property(cc.Prefab)
    private loginBoxPrefab: cc.Prefab = null;

    private createLogInBox() {
        if(Global.logincancelFlag==false)
        {
            cc.log("create longinbox");
            let loginBox = cc. instantiate(this.loginBoxPrefab);
            loginBox.getComponent('loginBox').init(this.node);
        }
    }
}

