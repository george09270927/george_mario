const {ccclass, property} = cc._decorator;

@ccclass
export default class Goomba extends cc.Component {

    private speed = 50;

    private anim: cc.Animation = null;

    start()
    {
        this.anim = this.getComponent(cc.Animation);
    }

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.goombaMove();
    }

    
    private setInitPos(node: cc.Node)
    {
        

        this.node.position = cc.v2(0,25);

        this.node.position = this.node.position.addSelf(node.position);
    }

    update(dt)
    {
        this.goombaMove();
    }
    //make the bullet move from current position
    private goombaMove()
    {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Player"&&contact.getWorldManifold().normal.y>0) {
            cc.log("goomba hit mario");
            this.speed=0;
            this.anim.play("goomdaDead");
            this.scheduleOnce(()=>{self.node.destroy();},0.4);
        }
        
        else if(contact.getWorldManifold().normal.x!=0)
        {
            this.speed = - this.speed;
            //this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        }
        
        this.schedule(()=>{this.speed = - this.speed;},5);
    }
    /*
    onEndContact(contact, self, other) {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
    }
    */
}