const {ccclass, property} = cc._decorator;

@ccclass
export default class Turtle extends cc.Component {

    @property({type:cc.AudioClip})
    private BreakAudio: cc.AudioClip=null;

    private speed = -60;

    private anim: cc.Animation = null;

    private nowstate;

    private callback;

    private turtleState= cc.Enum({
        Normal: 0,
        Hitten: 1,
        Turn: 2,
    });

    start()
    {
        this.nowstate = this.turtleState.Normal;
        this.anim = this.getComponent(cc.Animation);
        this.callback = function(){
            this.speed = 0 - this.speed;this.node.scaleX=-this.node.scaleX;
        }
        this.schedule(this.callback,2+Math.random());
    }

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.turtleMove();
    }

    
    private setInitPos(node: cc.Node)
    {

        this.node.position = cc.v2(0,25);

        this.node.position = this.node.position.addSelf(node.position);
    }

    update(dt)
    {
        this.turtleMove();
    }
    //make the bullet move from current position
    private turtleMove()
    {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Player"&&contact.getWorldManifold().normal.y>0) {
            cc.log("turtle hit mario");
            if(this.nowstate == this.turtleState.Normal)
            {
                this.nowstate = this.turtleState.Hitten;
                this.speed=0;
                this.anim.stop();
                this.anim.play("TurtleHitten");
                this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                this.node.getComponent(cc.PhysicsBoxCollider).size.height = 18;
                this.node.getComponent(cc.PhysicsBoxCollider).offset.y = -6;
                this.node.getComponent(cc.PhysicsBoxCollider).enabled = true;
            }
            else if(this.nowstate == this.turtleState.Hitten)
            {
                this.nowstate = this.turtleState.Turn;
                this.unschedule(this.callback);
                this.nowstate = this.turtleState.Turn;
                this.speed = 300;
                this.anim.stop();
                this.anim.play("TurtleTurn");
            }
            else if(this.nowstate == this.turtleState.Turn)
            {
                this.speed=0;
                let moveAct = null;
                moveAct = cc.callFunc(()=>{this.anim.play("boxbreak")});
                let fadeAct = cc.fadeOut(0.8);
                let breakAct = cc.spawn(moveAct,fadeAct);
                let finishAct = cc.callFunc(()=>{this.node.destroy();});
                this.scheduleOnce(()=>{this.node.runAction(cc.sequence(breakAct,finishAct));cc.audioEngine.playEffect(this.BreakAudio,false);},0.1); 

                this.scheduleOnce(()=>{self.node.destroy();},0.7);
            }

            //this.scheduleOnce(()=>{self.node.destroy();},0.7);
        }
        else if(other.node.name == "Player"&&this.nowstate == this.turtleState.Hitten)
        {
                this.nowstate = this.turtleState.Turn;
                this.unschedule(this.callback);
                this.nowstate = this.turtleState.Turn;
                if(contact.getWorldManifold().normal.x>0) this.speed=-300;
                else if(contact.getWorldManifold().normal.x<=0) this.speed=300;
                this.anim.stop();
                this.anim.play("TurtleTurn");
        }
        
        else if(other.node.name == "worldrange")
        {
            self.node.destroy();
        }
        
        else if(contact.getWorldManifold().normal.x!=0)
        {
            cc.log("change");
            if(this.nowstate == this.turtleState.Turn)
            {
                this.speed=0;
                let moveAct = null;
                moveAct = cc.callFunc(()=>{this.anim.play("boxbreak")});
                let fadeAct = cc.fadeOut(0.8);
                let breakAct = cc.spawn(moveAct,fadeAct);
                let finishAct = cc.callFunc(()=>{this.node.destroy();});
                this.scheduleOnce(()=>{this.node.runAction(cc.sequence(breakAct,finishAct));cc.audioEngine.playEffect(this.BreakAudio,false);},0.1); 
                this.scheduleOnce(()=>{self.node.destroy();},0.7);
            }
            else if(contact.getWorldManifold().normal.x>0&&this.speed>0)
            {
                this.speed = 0 - this.speed;
                this.node.scaleX=-this.node.scaleX;
            }
            else if(contact.getWorldManifold().normal.x<0&&this.speed<0)
            {
                this.speed = 0 - this.speed;
                this.node.scaleX=-this.node.scaleX;
            }
            //this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        }
        
        
    }
    /*
    onEndContact(contact, self, other) {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
    }
    */
}