const {ccclass, property} = cc._decorator;

@ccclass
export default class Goomba extends cc.Component {

    @property({type:cc.AudioClip})
    private BreakAudio: cc.AudioClip=null;

    @property(cc.Prefab)
    private Score100Prefab: cc.Prefab = null;

    private speed = 80;

    private anim: cc.Animation = null;

    private dobreak=false;

    start()
    {
        this.anim = this.getComponent(cc.Animation);
        this.schedule(()=>{this.speed = 0 - this.speed;},2+Math.random());
        this.schedule(()=>{this.node.scaleX=-this.node.scaleX;},0.2);
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

            let moveAct = null;
            moveAct = cc.callFunc(()=>{this.anim.play("boxbreak")});
            let fadeAct = cc.fadeOut(0.8);
            let breakAct = cc.spawn(moveAct,fadeAct);
            let finishAct = cc.callFunc(()=>{this.node.destroy();});
            this.scheduleOnce(()=>{this.node.runAction(cc.sequence(breakAct,finishAct));cc.audioEngine.playEffect(this.BreakAudio,false);this.createScore100();},0.5); 

            this.scheduleOnce(()=>{self.node.destroy();},0.6);
        }/*
        else if(other.node.name == "Player"&&other.node.getComponent("Player").nowstate ==other.node.getComponent("Player").marioState.Big ) {
            cc.log("goomba hit mario");
            this.speed=0;
            this.anim.play("goomdaDead");

            let moveAct = null;
            moveAct = cc.callFunc(()=>{this.anim.play("boxbreak")});
            let fadeAct = cc.fadeOut(0.8);
            let breakAct = cc.spawn(moveAct,fadeAct);
            let finishAct = cc.callFunc(()=>{this.node.destroy();});
            this.scheduleOnce(()=>{this.node.runAction(cc.sequence(breakAct,finishAct));cc.audioEngine.playEffect(this.BreakAudio,false);this.createScore100();},0.5); 

            this.scheduleOnce(()=>{self.node.destroy();},0.6);
        }
        */
        else if(other.node.name == "Turtle"&&other.node.getComponent("Turtle").nowstate ==other.node.getComponent("Turtle").turtleState.Turn&&this.dobreak==false) {
            this.dobreak = true;
            cc.log("goomba hit turtle");
            this.speed=0;
            this.anim.play("goomdaDead");

            let moveAct = null;
            moveAct = cc.callFunc(()=>{this.anim.play("boxbreak")});
            let fadeAct = cc.fadeOut(0.8);
            let breakAct = cc.spawn(moveAct,fadeAct);
            let finishAct = cc.callFunc(()=>{this.node.destroy();});
            this.scheduleOnce(()=>{this.node.runAction(cc.sequence(breakAct,finishAct));cc.audioEngine.playEffect(this.BreakAudio,false);this.createScore100();},0.5); 

            this.scheduleOnce(()=>{self.node.destroy();},0.7);
        }
        else if(other.node.name == "worldrange")
        {
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
            
            //this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        }
        
        
    }
    /*
    onEndContact(contact, self, other) {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
    }
    */


    private createScore100() {
        let big = cc. instantiate(this.Score100Prefab);
        big.getComponent('Score100').init(this.node);
    }
}