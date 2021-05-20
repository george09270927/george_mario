const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component 
{
    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    @property(cc.Node)
    private camera: cc.Node = null;

    @property(cc.Node)
    private UI: cc.Node = null;

    private nowstate;

    private marioState= cc.Enum({
        Normal: 0,
        Big: 1,
        Fire: 2,
    });

    private anim: cc.Animation = null;

    private animstate = null;

    private playerSpeed: number = 0;

    private zDown: boolean = false; // key for player to go left

    private xDown: boolean = false; // key for player to go right

    private jDown: boolean = false; // key for player to shoot

    private kDown: boolean = false; // key for player to jump

    private isDead: boolean = false;

    private onGround: boolean = false;

    private hit_right_main: boolean = false;
    private hit_left_main: boolean = false;
    private deadfinish: boolean = true;
    
    
    private isBig: boolean = false;
    private bigfinish: boolean = true;

    private isNormal: boolean = false;
    private normalfinish: boolean = true;

    private invicible: boolean = false;

    start() {
        this.anim = this.getComponent(cc.Animation);
      }

    onLoad() {
       
        cc.director.getPhysicsManager().enabled = true;        	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.nowstate = this.marioState.Normal; 
        //cc.director.getPhysicsManager().debugDrawFlags=1;
    }

    onKeyDown(event) {
        cc.log("Key Down: " + event.keyCode);
        if(event.keyCode == cc.macro.KEY.z) {
            this.zDown = true;
            this.xDown = false;
        } else if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = true;
            this.zDown = false;
        } else if(event.keyCode == cc.macro.KEY.k) {
            this.kDown = true;
        } else if(event.keyCode == cc.macro.KEY.j) {
            this.jDown = true;
            this.createBullet();
        }
    }
    
    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.z)
            this.zDown = false;
        else if(event.keyCode == cc.macro.KEY.x)
            this.xDown = false;
        else if(event.keyCode == cc.macro.KEY.j)
            this.jDown = false;
        else if(event.keyCode == cc.macro.KEY.k)
            this.kDown = false;
    }
    
    private playerMovement(dt) {
        this.playerSpeed = 0;
        if(this.isDead) {
            return;
        }
        else if(this.isBig)
        {
            this.node.getComponent(cc.PhysicsBoxCollider).size.height = 28;
            this.node.scaleX = 1;
            return;
        }
        else if(this.isNormal)
        {
            this.node.getComponent(cc.PhysicsBoxCollider).size.height = 16;
            this.node.scaleX = 1;
            return;
        }

        else if(this.zDown&&this.hit_left_main==false){
            this.playerSpeed = -100;
            this.node.scaleX = -1;
        }
        else if(this.xDown&&this.hit_right_main==false){
            this.playerSpeed = 100;
            this.node.scaleX = 1;
        }
        
        if(this.kDown && this.onGround)
        {
            this.hit_right_main = false;
            this.hit_left_main = false; 
            this.jump();
        }
        this.node.x += this.playerSpeed * dt;
    }    

    private jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 1500000), true);

        // Method II: Change velocity of rigidbody
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 320);
    }

    private createBullet() {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.getComponent('Bullet_ans').init(this.node);
    }
    
    update(dt) {
        //cc.log(this.node.getComponent(cc.PhysicsBoxCollider).size);
        this.playerMovement(dt);
        this.camerafollow();
        this.UIfollow();
        //cc.log(this.nowstate);
        if(this.isDead&&this.deadfinish)
        {
            this.reborn();
            this.deadfinish=false;
        }
        else if(this.isBig&&this.bigfinish)
        {
            this.turnBig();
            this.bigfinish=false;
        }
        else if(this.isNormal&&this.normalfinish)
        {
            this.turnNormal();
            this.normalfinish=false;
        }
        else if(this.isBig==false&&this.isDead==false&&this.playerSpeed!=0&&this.animstate!="marioRun"&&this.nowstate==this.marioState.Normal)
        {
            this.anim.stop();
            this.animstate=this.anim.play("marioRun");
            this.animstate="marioRun";
        }
        else if(this.isBig==false&&this.isDead==false&&this.playerSpeed==0&&this.animstate!="marioIdle"&&this.nowstate==this.marioState.Normal)
        {
            this.anim.stop();
            this.anim.play("marioIdle");
            this.animstate="marioIdle";
        }
        else if(this.isBig==false&&this.isDead==false&&this.playerSpeed!=0&&this.animstate!="marioBigRun"&&this.nowstate==this.marioState.Big)
        {
            this.anim.stop();
            this.anim.play("marioBigRun");
            this.animstate="marioBigRun";
        }
        else if(this.isBig==false&&this.isDead==false&&this.playerSpeed==0&&this.animstate!="marioBigIdle"&&this.nowstate==this.marioState.Big)
        {
            
            this.anim.stop();
            this.anim.play("marioBigIdle");
            this.animstate="marioBigIdle";
        }
        
    }

    onBeginContact(contact, self, other) {
        if(this.isDead==false)
        {
            if(other.node.name == "main") {
                cc.log("mario hits the main ground");
                this.onGround = true;
                
                cc.log( this.node.getComponent(cc.PhysicsBoxCollider).size);
            } else if(other.node.name == "coinbox") {
                cc.log("mario hits the coinbox");
                this.onGround = true;
            } else if(other.node.name == "bigbox") {
                cc.log("mario hits the bigbox");
                this.onGround = true;
            } else if(other.node.name == "normalbrick") {
                cc.log("mario hits the coinbox");
                this.onGround = true;
            } else if(other.node.name == "Big") {
                cc.log("mario hits the Big");
                this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                this.node.getComponent(cc.PhysicsBoxCollider).size.height = 28;
                this.isBig = true;
            } else if(other.node.name == "Goomba") {
                cc.log("mario hits the Goomda");
                if(contact.getWorldManifold().normal.y<0) this.jump();
                else 
                {
                    if(this.nowstate==this.marioState.Big)
                    {
                        this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                        this.node.getComponent(cc.PhysicsBoxCollider).size.height = 16;
                        this.isNormal=true;
                    }
                    else this.isDead = true;
                }
            } else if(other.node.name == "worldrange")
            {
                this.isDead = true;
            }
        }
    }

    camerafollow(){
        var scene = cc.director.getScene();
            if(this.node.x<=450)
            {
                this.camera.x=0;
            }
            else
            {
                this.camera.x = this.node.x-450;
            }
    }

    UIfollow(){
        var scene = cc.director.getScene();
            if(this.node.x<=450)
            {
                this.UI.x=0;
            }
            else
            {
                this.UI.x = this.node.x-450;
            }
    }


    reborn(){
        cc.log("reborn");
        this.anim.stop();
        this.animstate=this.anim.play("marioDead");
        cc.director.getPhysicsManager().enabled = false;  
        this.node.runAction(cc.sequence(cc.moveBy(1,0,20),cc.moveBy(1,0,-500)));

        // Return to reborn position
        this.scheduleOnce(()=>{
            this.node.x = 100;
            this.node.y = 100;
            cc.director.getPhysicsManager().enabled = true; 
            // Init animation
            this.anim.stop();
            this.anim.play("marioIdle");
            this.animstate="marioIdle";
            this.deadfinish=true;
            this.isDead=false;
            },2);
    }

    turnBig(){
        this.anim.stop();
        this.anim.play("marioBigIdle");
        this.animstate="marioBigIdle";
        cc.director.getPhysicsManager().enabled = false;
        cc.log("turnbig");
        this.nowstate=this.marioState.Big;
        //this.scheduleOnce(()=>{this.nowstate=this.marioState.Normal},15);
        this.node.runAction(cc.sequence(cc.moveBy(1,0,20),cc.moveBy(1,0,-20)));
        this.scheduleOnce(()=>{
            cc.director.getPhysicsManager().enabled = true;
            this.node.getComponent(cc.PhysicsBoxCollider).enabled = true;
            this.bigfinish=true;
            this.isBig=false;
        },2);
    }

    turnNormal(){
        this.anim.stop();
        this.anim.play("marioIdle");
        this.animstate="marioIdle";
        cc.director.getPhysicsManager().enabled = false;
        cc.log("turnnormal");
        this.nowstate=this.marioState.Normal;
        //this.scheduleOnce(()=>{this.nowstate=this.marioState.Normal},15);
        this.node.runAction(cc.sequence(cc.moveBy(1,0,20),cc.moveBy(1,0,-20)));
        this.scheduleOnce(()=>{
            cc.director.getPhysicsManager().enabled = true;
            this.node.getComponent(cc.PhysicsBoxCollider).enabled = true;
            this.normalfinish=true;
            this.isNormal=false;
        },2);
        this.scheduleOnce(()=>{
            
        },4);
    }




}