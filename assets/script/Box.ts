const { ccclass, property } = cc._decorator;

@ccclass
export default class Box extends cc.Component {
  @property({ type: cc.AudioClip })
  soundEffect: cc.AudioClip = null;

  @property(cc.Prefab)
  private coinPrefab: cc.Prefab = null;

  protected isTouched: boolean = false;

  private anim: cc.Animation = null;

  private animState: cc.AnimationState = null;

  private highestPos: number = 118;

  private moveSpeed: number = 100;

  private springVelocity: number = 320;

  start() {
    this.anim = this.getComponent(cc.Animation);
  }

  reset() {
    this.isTouched = false;
  }

  update(dt) {
    
  }

  onBeginContact(contact, self, other) {
    cc.log("contact!!");
    
    if(self.node.name == "coinbox"&&other.node.name=="Player"&&this.isTouched==false) {
      if(contact.getWorldManifold().normal.y<0)
      {
        let action = cc.sequence(cc.moveBy(0.2,0,10),cc.moveBy(0.2,0,-10));
        this.node.runAction(action);
        this.anim.stop();
        this.anim.play("hittencoinbox");
        this.createCoin();
        cc.log("hits coinbox");
        this.isTouched=true;
      }
    } 
    
  }
  
  // 只在兩個碰撞體結束接觸時被呼叫一次
  onEndContact(contact, self, other) {
    
  }

  // 每次將要處理碰撞體接觸邏輯時被呼叫
  onPreSolve(contact, self, other) {
    
  }

  // 每次處理完碰撞體接觸邏輯時被呼叫
  onPostSolve(contact, self, other) {
    
  }
  
  private createCoin() {
    let coin = cc.instantiate(this.coinPrefab);
    coin.getComponent('Coin').init(this.node);
  }

}
