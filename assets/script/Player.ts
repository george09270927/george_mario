const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component 
{
    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    @property(cc.Node)
    private camera: cc.Node = null;

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

    start() {
        this.anim = this.getComponent(cc.Animation);
      }

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;        	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.nowstate = this.marioState.Normal;
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
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.node.position = cc.v2(-192, 255);
            this.isDead = false;
            return;
        }

        if(this.zDown){
            this.playerSpeed = -150;
            this.node.scaleX = -1;
        }
        else if(this.xDown){
            this.playerSpeed = 150;
            this.node.scaleX = 1;
        }
        
        this.node.x += this.playerSpeed * dt;

        if(this.kDown && this.onGround)
            this.jump();
    }    

    private jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 1500000), true);

        // Method II: Change velocity of rigidbody
         this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 500);
    }

    private createBullet() {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.getComponent('Bullet_ans').init(this.node);
    }
    
    update(dt) {
        this.playerMovement(dt);
        this.camerafollow();
        //cc.log(this.nowstate);
        if(this.playerSpeed!=0&&this.animstate!="marioRun")
        {
            this.anim.stop();
            this.animstate=this.anim.play("marioRun");
            this.animstate="marioRun";
        }
        else if(this.playerSpeed==0&&this.animstate!="marioIdle"){
            this.anim.stop();
            this.anim.play("marioIdle");
            this.animstate="marioIdle";
        }
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "main") {
            cc.log("mario hits the main ground");
            this.onGround = true;
        } else if(other.node.name == "coinbox") {
            cc.log("mario hits the coinbox");
            this.onGround = true;
        } else if(other.node.name == "normalbrick") {
            cc.log("mario hits the coinbox");
            this.onGround = true;
        } else if(other.node.name == "Big") {
            cc.log("mario hits the Big");
            this.nowstate=this.marioState.Big;
            this.scheduleOnce(()=>{this.nowstate=this.marioState.Normal},15);
        } else if(other.node.name == "enemy") {
            cc.log("Rockman hits the enemy");
            this.isDead = true;
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




}