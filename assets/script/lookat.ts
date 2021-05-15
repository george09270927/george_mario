const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property(cc.Node)
    map: cc.Node = null;

    boundingBox: cc.Rect = null;
    screenMiddle: cc.Vec2 = null;

    minX: number = 0;
    maxX: number = 0;
    minY: number = 0;
    maxY: number = 0;

    isRun: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.boundingBox = new cc.Rect(0, 0, this.map.width, this.map.height);
        let winsize = cc.winSize;
        this.screenMiddle = new cc.Vec2(winsize.width / 2, winsize.height / 2);
        this.minX = -(this.boundingBox.xMax - winsize.width);
        this.maxX = this.boundingBox.xMin;
        this.minY = -(this.boundingBox.yMax - winsize.height);
        this.maxY = this.boundingBox.yMin;
    }

    update() {
        if (!this.isRun) 
            return;
            
        let pos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let targertPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let dis = pos.sub(targertPos);
        let dest = this.screenMiddle.add(dis);
        dest.x = cc.misc.clampf(dest.x, this.minX, this.maxX);
        dest.y = this.minY;
        this.node.position = this.node.parent.convertToNodeSpaceAR(dest);
    }
}
