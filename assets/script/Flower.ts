const {ccclass, property} = cc._decorator;

@ccclass
export default class Flower extends cc.Component {

    private speed = 30+30*Math.random();
    private tmpspeed;
    private flag1: boolean = false;
    private flag2: boolean = false;

    private x;
    private y;

    onLoad() {
        this.y=this.node.y;
        cc.director.getPhysicsManager().enabled = true;
    }

    update(dt)
    {
        
        cc.log(this.y);
        cc.log(this.node.y);
        if(this.node.y-this.y>34&&this.flag1==false) 
        {
            this.tmpspeed = this.speed;
            this.speed = 0;
            this.scheduleOnce(()=>{this.speed = 0 - this.tmpspeed;},1+2*Math.random());
            this.flag1 = true;
            this.flag2 = false;
        }
        else if(this.node.y-this.y<0&&this.flag2==false) {
            this.tmpspeed = this.speed;
            this.speed = 0;
            this.scheduleOnce(()=>{this.speed = 0 - this.tmpspeed;},1+2*Math.random());
            this.flag2 = true;
            this.flag1 = false;
        }
        this.flowerMove();
    }
    //make the bullet move from current position
    private flowerMove()
    {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,this.speed);
    }
}
