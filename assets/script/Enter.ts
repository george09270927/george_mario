
const {ccclass, property} = cc._decorator;

@ccclass
export default class Enter extends cc.Component {

    enterpress()
    {
        
        cc.log(this.node.parent.getChildByName("EmailBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string);
        cc.log(this.node.parent.getChildByName("UserNameBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string);
        cc.log(this.node.parent.getChildByName("PasswordBox").getChildByName("TEXT_LABEL").getComponent(cc.Label).string);

        
    }
}
