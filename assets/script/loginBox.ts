import { Global } from "./SignUp";

const {ccclass, property} = cc._decorator;

@ccclass
export default class loginBox extends cc.Component {

    
    public init(node: cc.Node) 
    {
        this.setInitPos(node);
    }

    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(85,-12);

        this.node.position = this.node.position.addSelf(node.position);
        
    }

    update(dt)
    {
        if(Global.logincancelFlag==true) 
        {
            Global.logincancelFlag=false;
            Global.isLogin=false;
            this.node.destroy();
        }
    }
}

