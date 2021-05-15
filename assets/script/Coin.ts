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

        if(node.scaleX > 0)
        {
            this.node.position = cc.v2(62, 8);

            this.node.scaleX = 1;
        }
        else
        {
            this.node.position = cc.v2(-62, 8);

            this.node.scaleX = -1;
        }

        this.node.position = this.node.position.addSelf(node.position);
    }

    //make the bullet move from current position
    private coinMove()
    {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 600);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "leftBound" || other.node.name == "rightBound") {
            self.node.destroy();
        }
    }
}
