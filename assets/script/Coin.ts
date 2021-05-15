const {ccclass, property} = cc._decorator;

@ccclass
export default class Coin extends cc.Component {

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.coinMove();
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(0, 25);

        this.node.position = this.node.position.addSelf(node.position);
    }

    //make the bullet move from current position
    private coinMove()
    {
        let moveAct = null;
        moveAct = cc.moveBy(0.2,0,10);
        let fadeAct = cc.fadeOut(0.8);
        let coinAct = cc.spawn(moveAct,fadeAct);
        let finishAct = cc.callFunc(()=>{this.node.destroy();});
        this.scheduleOnce(()=>{this.node.runAction(cc.sequence(coinAct,finishAct));}); 
        //this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 600);
    }
}
