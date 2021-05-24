
const {ccclass, property} = cc._decorator;

export module Global {
    export let signupFlag : boolean = false;
    export let signupcancelFlag : boolean = false;
    export let isSignup: boolean = false;
    export let loginFlag : boolean = false;
    export let logincancelFlag : boolean = false;
    export let isLogin: boolean = false;
}


@ccclass
export default class SignUP extends cc.Component {

    @property(cc.Prefab)
    private signupBoxPrefab: cc.Prefab = null;

    private createSignUpBox() {
        if(Global.signupcancelFlag==false&&Global.isLogin==false)
        {
            let signupBox = cc. instantiate(this.signupBoxPrefab);
            signupBox.getComponent('signupBox').init(this.node);
            Global.isSignup=true;
        }
    }
}
