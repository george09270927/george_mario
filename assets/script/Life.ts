const {ccclass, property} = cc._decorator;

@ccclass
export default class Life extends cc.Component {

    private speed = 70;


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.LifeMove();
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(0,26);

        this.node.position = this.node.position.addSelf(node.position);
    }

    update(dt)
    {
        this.LifeMove();
    }
    //make the bullet move from current position
    private LifeMove()
    {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Player") {
            cc.log("Life hit mario");
            self.node.destroy();
        }
        
        else if(contact.getWorldManifold().normal.x!=0)
        {
            if(contact.getWorldManifold().normal.x>0&&this.speed>0)
            {
                this.speed = 0 - this.speed;
            }
            else if(contact.getWorldManifold().normal.x<0&&this.speed<0)
            {
                this.speed = 0 - this.speed;
            }
        }
        
    }
    /*
    onEndContact(contact, self, other) {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
    }
    */
}
