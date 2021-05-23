import { Global } from "./Player";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Score100 extends cc.Component {

    

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        Global.scorenum+=100;
    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.Score100Move();
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(0, 20);

        this.node.position = this.node.position.addSelf(node.position);
    }

    //make the bullet move from current position
    private Score100Move()
    {
        let moveAct = null;
        moveAct = cc.moveBy(3,0,5);
        let fadeAct = cc.fadeOut(1);
        let coinAct = cc.spawn(moveAct,fadeAct);
        let finishAct = cc.callFunc(()=>{this.node.destroy();});
        this.scheduleOnce(()=>{this.node.runAction(cc.sequence(coinAct,finishAct));}); 
    }
}
