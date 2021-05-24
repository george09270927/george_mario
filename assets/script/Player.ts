const {ccclass, property} = cc._decorator;


export module Global {
    export let scorenum : number = 0;
    export let lifenum : number = 1;
    export let timenum: number = 300;
    export let coinnum: number = 0;
}


@ccclass
export default class Player extends cc.Component 
{
    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    @property(cc.Node)
    private camera: cc.Node = null;

    @property(cc.Node)
    private UI: cc.Node = null;

    @property(cc.Node)
    private timeText: cc.Node = null;

    @property(cc.Node)
    private lifeText: cc.Node = null;

    @property(cc.Node)
    private coinText: cc.Node = null;

    @property(cc.Node)
    private scoreText: cc.Node = null;

    @property(cc.Node)
    private finaltimeIcon: cc.Node = null;

    @property(cc.Node)
    private finalcrossIcon: cc.Node = null;

    @property(cc.Node)
    private finaltimeText: cc.Node = null;

    @property(cc.Node)
    private fiftyText: cc.Node = null;

    @property(cc.Node)
    private finalscoreText: cc.Node = null;
    
    @property(cc.Node)
    private finalclearText1: cc.Node = null;

    @property(cc.Node)
    private finaltotalscoreText1: cc.Node = null;

    @property(cc.Node)
    private finaltotalscoreText2: cc.Node = null;

    @property(cc.Node)
    private finalclearText3: cc.Node = null;

    @property({type:cc.AudioClip})
    private JumpAudio: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private LoseOneLifeAudio: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private PowerUpAudio: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private PowerDownAudio: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private Bgm1: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private Bgm2: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private KickAudio: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private StompAudio: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private ReserveAudio: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private finishAudio: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private countAudio1: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private countAudio2: cc.AudioClip=null;

    @property(cc.Prefab)
    private Score1000Prefab: cc.Prefab = null;

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

    //private invicible: boolean = true;
    private invicible: boolean = false;

    //private timenum: number = 300;

    //private lifenum: number = 5;

    //private coinnum: number = 0;

    //public scorenum: number = 0;

    private countdown;

    private Touch: boolean = false;

    private isMove: boolean = false;
    private movefinish: boolean = true;

    private isMove2: boolean = false;
    private movefinish2: boolean = true;

    private isFinish: boolean = false;
    private finishfinish: boolean = true;

    private finishclearflag: boolean = false;
    private finishtimeflag: boolean = false;
    private finishscoreflag: boolean = false;
    private finishtotalscoreflag: boolean = false;


    private blink = cc.blink(2,6).repeatForever();
    private isblink = false;

    private nowlevel;

    private mysum;
    private mytimesum;

    private menuflag=false;


    start() {
        this.anim = this.getComponent(cc.Animation);
        cc.audioEngine.playMusic(this.Bgm1,true);
        this.countdown = function(){
            if(Global.timenum>0)Global.timenum--;
            //cc.log(this.timenum);
        }
        this.schedule(this.countdown,1);

        var scene = cc.director.getScene();
        if(scene.name == "level1"){
            this.nowlevel=1;
        }else if(scene.name == "level2"){
            this.nowlevel=2;
        }

        this.finaltimeIcon.opacity = 0;
        this.finalcrossIcon.opacity = 0;
      }

    onLoad() {
        
        cc.director.getPhysicsManager().enabled = true;        	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.nowstate = this.marioState.Normal; 
        cc.director.getPhysicsManager().debugDrawFlags=1;
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

        else if(this.isMove)
        {
            return;
        }

        else if(this.isMove2)
        {
            return;
        }
        else if(this.isFinish)
        {
            return;
        }

        else if(this.zDown&&this.hit_left_main==false){
            this.playerSpeed = -120;
            this.node.scaleX = -1;
        }
        else if(this.xDown&&this.hit_right_main==false){
            this.playerSpeed = 120;
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

        if(this.nowstate==this.marioState.Normal)
        {
            this.anim.stop();
            this.anim.play("marioJump");
            this.animstate="marioJump";
            
        }
        else
        {
            this.anim.stop();
            this.anim.play("marioBigJump");
            this.animstate="marioBigJump";
            
        }

        cc.audioEngine.playEffect(this.JumpAudio,false);
    }

    private jump2() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 1500000), true);

        // Method II: Change velocity of rigidbody
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 320);

        if(this.nowstate==this.marioState.Normal)
        {
            this.anim.stop();
            this.anim.play("marioJump");
            this.animstate="marioJump";
        }
        else
        {
            this.anim.stop();
            this.anim.play("marioBigJump");
            this.animstate="marioBigJump";
        }

        cc.audioEngine.playEffect(this.KickAudio,false);
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
        this.UIupdate();
        //cc.log(this.nowstate);
        if(this.isDead&&this.deadfinish)
        {
            if(Global.lifenum>=0)
            {
                Global.lifenum--;
                this.reborn();
                this.deadfinish=false;
            }
            else 
            {
                this.reborn();
                this.deadfinish=false;
            }
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
        else if(this.isMove&&this.movefinish)
        {
            this.turnMove();
            this.movefinish=false;
        }
        else if(this.isMove2&&this.movefinish2)
        {
            this.turnMove2();
            this.movefinish2=false;
        }
        else if(this.isFinish&&this.finishfinish)
        {
            this.turnfinish();
            this.finishfinish=false;
        }
        else if(this.isBig==false&&this.isDead==false&&this.playerSpeed!=0&&this.animstate!="marioRun"&&this.nowstate==this.marioState.Normal)
        {
            if(this.onGround)
            {
                this.anim.stop();
                this.animstate=this.anim.play("marioRun");
                this.animstate="marioRun";
                    
            }
            
        }
        else if(this.isBig==false&&this.isDead==false&&this.playerSpeed==0&&this.animstate!="marioIdle"&&this.nowstate==this.marioState.Normal)
        {
            this.anim.stop();
            this.anim.play("marioIdle");
            this.animstate="marioIdle";
            
        }
        else if(this.isBig==false&&this.isDead==false&&this.playerSpeed!=0&&this.animstate!="marioBigRun"&&this.nowstate==this.marioState.Big)
        {
            if(this.onGround)
            {
                this.anim.stop();
                this.anim.play("marioBigRun");
                this.animstate="marioBigRun";
                
            }
        }
        else if(this.isBig==false&&this.isDead==false&&this.playerSpeed==0&&this.animstate!="marioBigIdle"&&this.nowstate==this.marioState.Big)
        {
            
            this.anim.stop();
            this.anim.play("marioBigIdle");
            this.animstate="marioBigIdle";
            
        }
        
        if(this.invicible==true&&this.isblink==false) 
        {
            this.node.runAction(this.blink);
            this.isblink=true;
        }
        else if(this.invicible==false&&this.isblink==true)
        {
            this.node.stopAction(this.blink);
            this.isblink=false;
        }
    }

    onBeginContact(contact, self, other) {
        if(this.isDead==false)
        {
            if(other.node.name == "main") {
                cc.log("mario hits the main ground");
                this.onGround = true;
                
                //cc.log( this.node.getComponent(cc.PhysicsBoxCollider).size);
            } else if(other.node.name == "coinbox"&&contact.getWorldManifold().normal.y<0) {
                cc.log("mario hits the coinbox");
                this.onGround = true;
            } else if(other.node.name == "manycoinbox"&&contact.getWorldManifold().normal.y<0) {
                cc.log("mario hits the coinbox");
                this.onGround = true;
            } else if(other.node.name == "bigbox"&&contact.getWorldManifold().normal.y<0) {
                cc.log("mario hits the bigbox");
                this.onGround = true;
            } else if(other.node.name == "normalbrick"&&contact.getWorldManifold().normal.y<0) {
                cc.log("mario hits the coinbox");
                this.onGround = true;
            } else if(other.node.name == "Big") {
                cc.log("mario hits the Big");
                this.createScore1000();
                this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                this.node.getComponent(cc.PhysicsBoxCollider).size.height = 28;
                this.isBig = true;
            } else if(other.node.name == "Life") {
                cc.log("mario hits the Life");
                Global.lifenum++;
                cc.audioEngine.playEffect(this.ReserveAudio,false);
            } else if(other.node.name == "RealCoin") {
                cc.log("mario hits the RealCoin");
                Global.coinnum++;
            } else if(other.node.name == "Goomba") {
                cc.log("mario hits the Goomda");
                if(contact.getWorldManifold().normal.y<0) this.jump2();
                else 
                {
                    if(this.nowstate==this.marioState.Big)
                    {
                        this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                        this.node.getComponent(cc.PhysicsBoxCollider).size.height = 16;
                        this.isNormal=true;
                    }
                    else if(this.invicible==false) this.isDead = true;
                }
            }  else if(other.node.name == "Flower") {
                cc.log("mario hits the Flower");
                
                    if(this.nowstate==this.marioState.Big)
                    {
                        this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                        this.node.getComponent(cc.PhysicsBoxCollider).size.height = 16;
                        this.isNormal=true;
                    }
                    else if(this.invicible==false) this.isDead = true;
                
            }  else if(other.node.name == "Turtle") {
                cc.log("mario hits the Turtle");
                if(contact.getWorldManifold().normal.y<0) this.jump2();
                else if(other.node.getComponent("Turtle").nowstate==other.node.getComponent("Turtle").turtleState.Normal)
                {
                    
                    if(this.nowstate==this.marioState.Big)
                    {
                        this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                        this.node.getComponent(cc.PhysicsBoxCollider).size.height = 16;
                        this.isNormal=true;
                    }
                    else if(this.invicible==false) this.isDead = true;
                }
                else cc.audioEngine.playEffect(this.StompAudio,false);
            } else if(other.node.name == "worldrange")
            {
                if(this.nowstate==this.marioState.Big) 
                {
                    this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                    this.node.getComponent(cc.PhysicsBoxCollider).size.height = 16;
                    this.isNormal=true;
                }
                else if(this.invicible==false) this.isDead = true;
            }
            else if(other.node.name == "pipelineLeft"&&contact.getWorldManifold().normal.x>0&&this.onGround==true)
            {
                this.isMove=true;
            }
            else if(other.node.name == "pipelineUp") {
                this.onGround = true;
                if((this.node.x-other.node.x)*(this.node.x-other.node.x)<80)  this.isMove2=true;
            }
            else if(other.node.name == "flag")
            {
                this.isFinish=true;
            }
        }
    }

    camerafollow(){
        var scene = cc.director.getScene();
            if(this.node.x<=290)
            {
                this.camera.x=-160;
            }
            else if(this.node.x<=3650)
            {
                this.camera.x = this.node.x-450;
            }
            
            if(this.isDead==false)
            {
                if(this.node.y<0) this.camera.y = -350;
                else this.camera.y=-65;
            }
            
            
    }

    UIfollow(){
        var scene = cc.director.getScene();
            if(this.node.x<=290)
            {
                this.UI.x=0;
            }
            else if(this.node.x<=3650)
            {
                this.UI.x = this.node.x-290;
            }
            
            if(this.isDead==false)
            {
                if(this.node.y<0) this.UI.y = -300;
                else this.UI.y=0;
            }
            
    }

    UIupdate(){
        this.timeText.getComponent(cc.Label).string = "" + Global.timenum;
        this.lifeText.getComponent(cc.Label).string = "" + Global.lifenum;
        this.coinText.getComponent(cc.Label).string = "" + Global.coinnum;
        this.scoreText.getComponent(cc.Label).string = (Array(7).join('0') + Global.scorenum).slice(-7);

        if(this.finishclearflag) 
        {
            this.finalclearText1.getComponent(cc.Label).string = "LEVEL";
            this.finalclearText3.getComponent(cc.Label).string = "CLEAR";
        }
        if(this.finishtimeflag)
        {
            this.finaltimeIcon.opacity = 255;
            this.finalcrossIcon.opacity = 255;
            this.finaltimeText.getComponent(cc.Label).string = ""+Global.timenum;
            this.fiftyText.getComponent(cc.Label).string = "50";
        }
        if(this.finishscoreflag)
        {
            this.finalscoreText.getComponent(cc.Label).string = ""+50*Global.timenum;
            this.mysum=Global.scorenum+50*Global.timenum;
            this.mytimesum=50*Global.timenum;
            this.finishscoreflag=false;
        }
        if(this.finishtotalscoreflag&&Global.scorenum!=this.mysum)
        {
            this.mytimesum-=50;
            this.finalscoreText.getComponent(cc.Label).string = ""+this.mytimesum;
            this.finaltotalscoreText1.getComponent(cc.Label).string = "TOTAL";
            Global.scorenum+=50;
            this.finaltotalscoreText2.getComponent(cc.Label).string = ""+Global.scorenum;
            cc.audioEngine.playEffect(this.countAudio1,false);
        }
        if(Global.scorenum==this.mysum&&this.menuflag==false)
        {
            this.menuflag=true;
            cc.audioEngine.playEffect(this.countAudio2,false);
            this.scheduleOnce(()=>{cc.director.loadScene("Menu");},3);
        }   
    }


    reborn(){
        cc.audioEngine.stopMusic();
        if(Global.lifenum<0) cc.director.loadScene("gameover");
        else 
        {
            cc.director.loadScene("gamestart");
            cc.audioEngine.playMusic(this.LoseOneLifeAudio,false);
            cc.log("reborn");
            this.anim.stop();
            this.animstate=this.anim.play("marioDead");
            cc.director.getPhysicsManager().enabled = false;

            this.unschedule(this.countdown);
              
            this.node.runAction(cc.sequence(cc.moveBy(1,0,20),cc.moveBy(1,0,-500)));
        }
        // Return to reborn position
        
        /*
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
            cc.audioEngine.playMusic(this.Bgm1,true);
            this.schedule(this.countdown,1);
            },3);
            */
    }

    turnBig(){
        cc.audioEngine.playEffect(this.PowerUpAudio,false);
        this.node.runAction(cc.blink(2,6));
        this.anim.stop();
        this.anim.play("marioBigIdle");
        this.animstate="marioBigIdle";
        cc.director.getPhysicsManager().enabled = false;

        this.unschedule(this.countdown);

        cc.log("turnbig");
        this.nowstate=this.marioState.Big;
        //this.scheduleOnce(()=>{this.nowstate=this.marioState.Normal},15);
        this.node.runAction(cc.sequence(cc.moveBy(1,0,20),cc.moveBy(1,0,-20)));
        this.scheduleOnce(()=>{
            cc.director.getPhysicsManager().enabled = true;
            this.node.getComponent(cc.PhysicsBoxCollider).enabled = true;
            this.bigfinish=true;
            this.isBig=false;
            this.schedule(this.countdown,1);
        },2);
    }

    turnNormal(){
        cc.audioEngine.playEffect(this.PowerDownAudio,false);
        this.node.runAction(cc.blink(2,6));
        this.anim.stop();
        this.anim.play("marioIdle");
        this.animstate="marioIdle";
        cc.director.getPhysicsManager().enabled = false;

        this.unschedule(this.countdown);

        cc.log("turnnormal");
        this.nowstate=this.marioState.Normal;
        //this.scheduleOnce(()=>{this.nowstate=this.marioState.Normal},15);
        this.node.runAction(cc.sequence(cc.moveBy(1,0,20),cc.moveBy(1,0,-20)));
        this.scheduleOnce(()=>{
            this.invicible=true;
            this.scheduleOnce(()=>{this.invicible=false},5);
            cc.director.getPhysicsManager().enabled = true;
            this.node.getComponent(cc.PhysicsBoxCollider).enabled = true;
            this.normalfinish=true;
            this.isNormal=false;
            this.schedule(this.countdown,1);
        },2);
    }

    turnMove()
    {
        cc.audioEngine.pauseMusic();
        cc.audioEngine.playEffect(this.PowerDownAudio,false);
        cc.director.getPhysicsManager().enabled = false;
        this.unschedule(this.countdown);
  
        this.node.runAction(cc.moveBy(1,20,0));

        this.scheduleOnce(()=>{
            this.node.x = 3055;
            this.node.y = 50;
            this.node.runAction(cc.moveBy(1,0,25));
            cc.audioEngine.playEffect(this.PowerDownAudio,false);
            this.scheduleOnce(()=>{
                cc.director.getPhysicsManager().enabled = true;
                cc.audioEngine.playMusic(this.Bgm1,true);
                this.schedule(this.countdown,1);
                this.isMove=false;
                this.movefinish=true;
            },1);
            
        },2);
    }

    turnMove2()
    {
        cc.audioEngine.pauseMusic();
        cc.audioEngine.playEffect(this.PowerDownAudio,false);
        cc.director.getPhysicsManager().enabled = false;
        this.unschedule(this.countdown);
  
        this.node.runAction(cc.moveBy(1,0,-20));

        this.scheduleOnce(()=>{
            this.node.x = 2780;
            this.node.y = -50;
            this.node.runAction(cc.moveBy(1,0,-25));
            cc.audioEngine.playEffect(this.PowerDownAudio,false);
            this.scheduleOnce(()=>{
                cc.director.getPhysicsManager().enabled = true;
                cc.audioEngine.playMusic(this.Bgm2,true);
                this.schedule(this.countdown,1);
                this.isMove2=false;
                this.movefinish2=true;
            },1);
        },2);
    }


    turnfinish()
    {
        this.unschedule(this.countdown);
        cc.audioEngine.pauseMusic();
        cc.director.getPhysicsManager().enabled = false;
        cc.audioEngine.playMusic(this.finishAudio,false);
        this.node.runAction(cc.moveTo(1,this.node.x,89));
        this.scheduleOnce(()=>{this.finishclearflag=true},1);
        this.scheduleOnce(()=>{this.finishtimeflag=true},2);
        this.scheduleOnce(()=>{this.finishscoreflag=true},3);
        this.scheduleOnce(()=>{ 
            this.finaltotalscoreText1.getComponent(cc.Label).string = "TOTAL";   
            this.finaltotalscoreText2.getComponent(cc.Label).string = ""+Global.scorenum;},4);
       
        this.scheduleOnce(()=>{this.finishtotalscoreflag=true},5);

    }

    private createScore1000() {
        let big = cc. instantiate(this.Score1000Prefab);
        big.getComponent('Score1000').init(this.node);
      }

}