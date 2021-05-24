
const {ccclass, property} = cc._decorator;

export module Global {
    export let signupFlag : boolean = false;
    export let signupcancelFlag : boolean = false;
}


@ccclass
export default class SignUP extends cc.Component {

    @property(cc.Prefab)
    private signupBoxPrefab: cc.Prefab = null;

    private createSignUpBox() {
        if(Global.signupcancelFlag==false)
        {
            let signupBox = cc. instantiate(this.signupBoxPrefab);
            signupBox.getComponent('signupBox').init(this.node);
        }
    }
}
