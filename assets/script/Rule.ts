import { Global } from "./Player";

const {ccclass, property} = cc._decorator;


@ccclass
export default class Rule extends cc.Component {

    @property(cc.Prefab)
    private RuleBoxPrefab: cc.Prefab = null;

    private createRuleBox() {

        if(Global.ioFlag==false) Global.ioFlag=true;
        else if(Global.ioFlag==true)  Global.ioFlag=false;


        if(Global.ioFlag==true)
        {
            let RuleBox = cc. instantiate(this.RuleBoxPrefab);
            RuleBox.getComponent('RuleBox').init(this.node);
        }
        else Global.ruleFlag=true;
    }
}