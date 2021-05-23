const {ccclass, property} = cc._decorator;

@ccclass
export default class Life extends cc.Component {

    @property(cc.Prefab)
    private Score200Prefab: cc.Prefab = null;

    @property({ type: cc.AudioClip })
    CoinAudio: cc.AudioClip = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Player") {
            cc.log("Life hit mario");
            cc.audioEngine.playEffect(this.CoinAudio,false);
            this.createScore200();
            self.node.destroy();
        }
            
    }


    private createScore200() {
        let big = cc. instantiate(this.Score200Prefab);
        big.getComponent('Score200').init(this.node);
    }
}