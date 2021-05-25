import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UpCursor extends cc.Component {

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
    }

    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(-50,0);

        this.node.position = this.node.position.addSelf(node.position);
        
    }

    update (dt) 
    {
        if(Global.pauseCursor==true)
        {   
            Global.pauseUp=false;
            this.node.destroy();
        }
        else if(Global.pauseBreak==true)
        {
            Global.pauseBreak=false;
            this.node.destroy();
        }
    }
    

}
