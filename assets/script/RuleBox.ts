import { Global } from "./Player";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RubleBox extends cc.Component {

    
    public init(node: cc.Node) 
    {
        this.setInitPos(node);
    }

    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(-260,-24);

        this.node.position = this.node.position.addSelf(node.position);
        
    }

    update(dt)
    {
        if(Global.ruleFlag==true) 
        {
            Global.ruleFlag=false;
            this.node.destroy();
        }
    }
}
