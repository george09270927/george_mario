const {ccclass, property} = cc._decorator;

@ccclass
export default class Big extends cc.Component {

    private speed = 70;


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.bigMove();
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(0,25);

        this.node.position = this.node.position.addSelf(node.position);
    }

    update(dt)
    {
        this.bigMove();
    }
    //make the bullet move from current position
    private bigMove()
    {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Player") {
            cc.log("big hit mario");
            self.node.destroy();
        }
        
        else if(contact.getWorldManifold().normal.x!=0)
        {
            this.speed = - this.speed;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        }
        
    }
    /*
    onEndContact(contact, self, other) {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
    }
    */
}
