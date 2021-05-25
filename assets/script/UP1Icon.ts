const {ccclass, property} = cc._decorator;

@ccclass
export default class  extends cc.Component {

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.UP1Move();
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(0, 10);

        this.node.position = this.node.position.addSelf(node.position);
    }

    //make the bullet move from current position
    private UP1Move()
    {
        let moveAct = null;
        moveAct = cc.moveBy(0.2,0,5);
        let fadeAct = cc.fadeOut(0.8);
        let UP1Act = cc.spawn(moveAct,fadeAct);
        let finishAct = cc.callFunc(()=>{this.node.destroy();});
        this.scheduleOnce(()=>{this.node.runAction(cc.sequence(UP1Act,finishAct));}); 
    }
}
